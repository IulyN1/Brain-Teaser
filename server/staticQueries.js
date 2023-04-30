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

	pool.query(`SELECT id FROM users WHERE username = '${user}' AND password = '${pass}'`, (error, results) => {
		if (error) {
			console.log(error);
		}
		if (results?.rows[0]?.id) {
			const id = results.rows[0].id;
			response.status(200).json({ id });
		} else {
			response.status(404).json({ id: 'User not found' });
		}
	});
};

module.exports = {
	login
};
