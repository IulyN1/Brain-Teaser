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

app.get('/challenges', db.getChallenges);
app.get('/challenges/:id', db.getChallenge);
app.post('/login', db.login);
app.post('/register', db.register);
app.post('/change-password', verifyToken, db.changePassword);
app.get('/challenge-solve/:id', db.getChallengeContent);
app.post('/check-flag', verifyToken, db.checkFlag);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
