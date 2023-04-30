const { verifyToken } = require('./utils');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
const staticDb = require('./staticQueries');
const puppeteer = require('puppeteer');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(express.static('public'));
app.get('/htmlhid', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/htmlhid/htmlhid.html');
});
app.get('/httpreq', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/httpreq/httpreq.html');
});
app.get('/req-flag', (req, res) => {
	res.status(200).json({ message: 'Work in progress!', flag: 'IDidNotRequestThisAbsolutelyNotAFlag' });
});
app.get('/jscode', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jscode/jscode.html');
});
app.get('/jsobf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jsobf/jsobf.html');
});
app.get('/exfilcss', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/exfilcss/exfilcss.html');
});
app.get('/xss1', (req, res) => {
	res.cookie('flag', 'ThisCouldBeAnAdminCookieButItIsNotLmao', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss1/xss1.html');
});
app.get('/xss2', (req, res) => {
	res.cookie('flag', 'DOOM2016BasedGameReflectedXSSAttacks', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss2/xss2.html');
});
app.get('/xss2-blog', (req, res) => {
	res.sendFile(__dirname + '/public/xss2/xss2-blog.html');
});
app.get('/xss2-notfound', (req, res) => {
	res.sendFile(__dirname + '/public/xss2/xss2-notfound.html');
});
app.get('/sqlinj', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/sqlinj/sqlinj.html');
});
app.post('/sqlinj-login', staticDb.login);
app.get('/csrf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/csrf/csrf.html');
});
app.post('/csrf-bugreport', (req, res) => {
	const link = req.body.link;
	if (link.includes('http://localhost:5000/csrf/send?to=attacker&amount=1000000')) {
		res.status(200).send('DoILookLikeATokenMisterReferer?No');
	} else {
		res.status(200).send('Thank you!');
	}
});
app.get('/csrf/send', (req, res) => {
	res.status(200).send('Money sent!');
});
app.get('/sesshij', (req, res) => {
	res.sendFile(__dirname + '/public/sesshij/sesshij.html');
});
function simulatePageRendering() {
	setInterval(async () => {
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.setCookie({
			name: 'flag',
			value: 'WhatDoYouMeanYourSession?ItIsOurSession1848',
			domain: 'localhost',
			path: '/'
		});
		await page.goto('http://localhost:5000/sesshij');
		// Close page after 5 seconds
		setTimeout(async () => {
			await browser.close();
		}, 5000);
	}, 20000); // Simulate page rendering every 20 seconds
}
let comments = [];
app.post('/sesshij/send', (req, res) => {
	const comment = req.body.comment;
	comments.push(comment);
	res.status(200).send(true);

	simulatePageRendering();
});
app.get('/sesshij-comments', (req, res) => {
	res.status(200).json(comments);
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
