const { generateToken, hashPassword, comparePasswords } = require('./utils');

const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'BrainTeaser',
	password: 'postgres',
	port: 5432
});

const getChallenges = (request, response) => {
	pool.query('SELECT * FROM challenges', (error, results) => {
		if (error) {
			console.log(error);
			return response.status(500).json({ message: error.message });
		}
		response.status(200).json(results.rows);
	});
};

const getChallenge = (request, response) => {
	const challengeId = parseInt(request.params.id);

	pool.query('SELECT * FROM challenges WHERE challengeId = $1', [challengeId], (error, results) => {
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
		response.status(200).json(true);
	});
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

module.exports = {
	getChallenges,
	getChallenge,
	login,
	register,
	changePassword
};
