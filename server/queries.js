const { verifyToken, generateToken, hashPassword, comparePasswords } = require('./utils');

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
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getChallenge = (request, response) => {
	const challengeId = parseInt(request.params.id);

	pool.query('SELECT * FROM challenges WHERE challengeId = $1', [challengeId], (error, results) => {
		if (error) {
			throw error;
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
			throw error;
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
			throw error;
		}
		response.status(200).json(true);
	});
};

module.exports = {
	getChallenges,
	getChallenge,
	login,
	register
};
