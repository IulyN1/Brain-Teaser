const { verifyToken } = require('./utils');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
const staticDb = require('./staticQueries');

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
app.get('/exfilcss', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/exfilcss.html');
});
app.get('/xss1', (req, res) => {
	res.cookie('flag', 'ThisCouldBeAnAdminCookieButItIsNotLmao', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss1.html');
});
app.get('/xss2', (req, res) => {
	res.cookie('flag', 'DOOM2016BasedGameReflectedXSSAttacks', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss2.html');
});
app.get('/xss2-blog', (req, res) => {
	res.sendFile(__dirname + '/public/xss2-blog.html');
});
app.get('/xss2-notfound', (req, res) => {
	res.sendFile(__dirname + '/public/xss2-notfound.html');
});
app.get('/sqlinj', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/sqlinj.html');
});
app.post('/sqlinj-login', staticDb.login);
app.get('/csrf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.cookie('token', 'myaccount', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/csrf.html');
});
app.post('/csrf-bugreport', (req, res) => {
	const link = req.body.link;
	if (link.includes('http://localhost:5000/csrf/send?to=myaccount&amount=1000000')) {
		res.status(200).send('DoILookLikeATokenMisterReferer?No');
	} else {
		res.status(200).send('Thank you!');
	}
});
app.get('/csrf/send', (req, res) => {
	res.status(200).send('Money sent!');
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
