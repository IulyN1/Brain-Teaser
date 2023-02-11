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

module.exports = {
	getChallenges,
	getChallenge
};
