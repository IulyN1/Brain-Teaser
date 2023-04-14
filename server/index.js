const { verifyToken } = require('./utils');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(express.static('public'));
app.get('/htmlbtn', (req, res) => {
	res.sendFile(__dirname + '/public/htmlbtn.html', (err) => {
		if (err) {
			console.error(err);
			res.status(500).end();
		}
	});
});

app.get('/challenges', db.getChallenges);
app.post('/login', db.login);
app.post('/register', db.register);
app.post('/change-password', verifyToken, db.changePassword);
app.post('/check-flag', verifyToken, db.checkFlag);
app.get('/stats', verifyToken, db.getStats);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
