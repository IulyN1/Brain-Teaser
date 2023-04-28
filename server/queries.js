const { generateToken, hashPassword, comparePasswords, roundNumber } = require('./utils');

const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'BrainTeaser',
	password: 'postgres',
	port: 5432
});

const getChallenges = (request, response) => {
	pool.query('SELECT * FROM challenges ORDER BY level, "challengeId" ASC', (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}
		response.status(200).json(results.rows);
	});
};

const login = async (request, response) => {
	const email = request.body.email;
	const pass = request.body.password;
	let user = {};

	// Check if a user exists with the given email
	pool.query('SELECT uid, password FROM users WHERE email = $1', [email], async (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}
		if (results.rows.length === 1) {
			user.id = results.rows[0].uid;
			user.pass = results.rows[0].password;
		}
		if (!user.pass) {
			return response.status(401).json({ message: 'Authentication failed: Email does not exist!' });
		}

		// Compare given password with the password found for the given email
		const passwordsMatch = await comparePasswords(pass, user.pass);
		if (!passwordsMatch) {
			return response.status(401).json({ message: 'Authentication failed: Invalid password!' });
		}

		// Generate JWT
		const token = generateToken(user.id);
		// Send JWT to client
		response.status(200).json({ token });
	});
};

const register = async (request, response) => {
	const email = request.body.email;
	const pass = request.body.password;
	const hashedPassword = await hashPassword(pass);

	pool.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, hashedPassword], (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}
		insertIntoStats(email, hashedPassword);
		response.status(200).json(true);
	});
};

const insertIntoStats = (email, hashedPassword) => {
	pool.query(
		'SELECT uid FROM users WHERE email = $1 AND password = $2',
		[email, hashedPassword],
		(error, results) => {
			if (error) {
				console.log(error);
			}
			if (results.rows.length === 1) {
				const uid = results.rows[0].uid;
				pool.query(
					'INSERT INTO stats(uid, points, submissions) VALUES($1, $2, $3)',
					[uid, 0, 0],
					(error, results) => {
						if (error) {
							console.log(error);
						}
					}
				);
			}
		}
	);
};

const changePassword = async (request, response) => {
	const uid = request.userId;
	const oldPass = request.body.oldPassword;
	const newPass = request.body.newPassword;

	// Get the existing password for the user
	pool.query('SELECT password FROM users WHERE uid = $1', [uid], async (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}

		let userPass;
		if (results.rows.length === 1) {
			userPass = results.rows[0].password;
		}

		// Compare given password as old password with the password found for the user
		const passwordsMatch = await comparePasswords(oldPass, userPass);
		if (!passwordsMatch) {
			return response.status(404).json({ message: 'The old password given is invalid!' });
		}

		const password = await hashPassword(newPass);

		// Update user password with the new one
		pool.query('UPDATE users SET password = $1 WHERE uid = $2', [password, uid], (error, results) => {
			if (error) {
				console.log(error);
				return response.status(500).json({ message: error.message });
			}
			response.status(200).json(true);
		});
	});
};

const checkFlag = (request, response) => {
	const uid = request.userId;
	const challengeId = request.body.challengeId;
	const flag = request.body.flag;

	pool.query('SELECT * FROM flags WHERE "challengeId" = $1', [challengeId], async (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}

		let challengeFlag;
		if (results.rows.length === 1) {
			challengeFlag = results.rows[0].flag;
		} else {
			response.status(404).json({ message: 'Challenge not found!' });
		}

		const isCompleted = await checkIfUserCompletedChallenge(challengeId, uid);

		if (flag === challengeFlag) {
			if (!isCompleted) {
				addCompleted(challengeId, uid);
				addSubmissionAndPoints(challengeId, uid);
			}
			response.status(200).json(true);
		} else {
			if (!isCompleted) {
				addSubmission(uid);
			}
			response.status(200).json(false);
		}
	});
};

const checkIfUserCompletedChallenge = async (challengeId, uid) => {
	const response = await pool.query('SELECT * FROM completed WHERE "challengeId" = $1 AND uid = $2', [
		challengeId,
		uid
	]);
	return response.rows.length === 1 ? true : false;
};

const addCompleted = (challengeId, uid) => {
	pool.query('INSERT INTO completed("challengeId", uid) VALUES($1, $2)', [challengeId, uid], (error, results) => {
		if (error) {
			console.log(error);
		}
	});
};

const addSubmission = (uid) => {
	pool.query('UPDATE stats SET submissions = submissions + 1 WHERE uid = $1', [uid], (error, results) => {
		if (error) {
			console.log(error);
		}
	});
};

const addSubmissionAndPoints = (challengeId, uid) => {
	let points;
	pool.query('SELECT * FROM challenges WHERE "challengeId" = $1', [challengeId], (error, results) => {
		if (error) {
			console.log(error);
		}

		if (results.rows.length === 1) {
			points = parseInt(results.rows[0].points);
		}

		if (points) {
			pool.query(
				'UPDATE stats SET submissions = submissions + 1, points = points + $1 WHERE uid = $2',
				[points, uid],
				(error, results) => {
					if (error) {
						console.log(error);
					}
				}
			);
		}
	});
};

const getStats = (request, response) => {
	const uid = request.userId;
	let stats = {};

	pool.query('SELECT * FROM stats WHERE uid = $1', [uid], async (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}

		if (results.rows.length === 1) {
			stats.points = results.rows[0].points;
			stats.submissions = results.rows[0].submissions;
		}

		const user = await getUser(uid);
		stats.user = user ? user : 'hacker';

		const completed = await getNoOfCompletedChallenges(uid);
		stats.completed = completed ? completed : 0;
		const rate = stats.completed / stats.submissions;
		stats.rate = rate ? roundNumber(rate * 100) : 0;

		response.status(200).json(stats);
	});
};

const getUser = async (uid) => {
	const results = await pool.query('SELECT * FROM users WHERE uid = $1', [uid]);
	if (results.rows.length === 1) {
		let user = results.rows[0].email;
		user = user.split('@')[0];
		return user;
	}
};

const getNoOfCompletedChallenges = async (uid) => {
	const results = await pool.query('SELECT COUNT(*) FROM completed WHERE uid = $1', [uid]);
	const completed = parseInt(results.rows[0].count);
	return completed;
};

module.exports = {
	getChallenges,
	login,
	register,
	changePassword,
	checkFlag,
	getStats
};
