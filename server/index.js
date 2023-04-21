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
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/htmlbtn.html');
});
app.get('/httpreq', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/httpreq.html');
});
app.get('/req-flag', (req, res) => {
	res.status(200).json({ message: 'Work in progress!', flag: 'IDidNotRequestThisAbsolutelyNotAFlag' });
});
app.get('/jscode', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jscode.html');
});
app.get('/jsobf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jsobf.html');
});
app.get('/xss1', (req, res) => {
	res.cookie('flag', 'ThisCouldBeAnAdminCookieButItIsNotLmao', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss1.html');
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
