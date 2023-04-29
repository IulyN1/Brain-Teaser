const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Test',
	password: 'postgres',
	port: 5432
});

const login = async (request, response) => {
	const user = request.body.username;
	const pass = request.body.password;

	pool.query(`SELECT id FROM users WHERE username = '${user}' AND password = '${pass}'`, async (error, results) => {
		if (error) {
			console.log(error);
		}
		if (results) {
			const id = results.rows[0].id;
			response.status(200).json({ id });
		}
	});
};

module.exports = {
	login
};
