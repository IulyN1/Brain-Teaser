const express = require('express');
const router = express.Router();
const staticDb = require('./staticQueries');
const puppeteer = require('puppeteer');

router.use(express.static('public'));

let comments = [];
let clearCommentsId;

// Routes for static pages
router.get('/htmlhid', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/htmlhid/htmlhid.html');
});
router.get('/httpreq', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/httpreq/httpreq.html');
});
router.get('/jscode', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jscode/jscode.html');
});
router.get('/jsobf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/jsobf/jsobf.html');
});
router.get('/exfilcss', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/exfilcss/exfilcss.html');
});
router.get('/xss1', (req, res) => {
	res.cookie('flag', 'ThisCouldBeAnAdminCookieButItIsNotLmao', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss1/xss1.html');
});
router.get('/xss2', (req, res) => {
	res.cookie('flag', 'DOOM2016BasedGameReflectedXSSAttacks', { maxAge: 86400000 });
	res.sendFile(__dirname + '/public/xss2/xss2.html');
});
router.get('/xss2-blog', (req, res) => {
	res.sendFile(__dirname + '/public/xss2/xss2-blog.html');
});
router.get('/xss2-notfound', (req, res) => {
	res.sendFile(__dirname + '/public/xss2/xss2-notfound.html');
});
router.get('/sqlinj', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/sqlinj/sqlinj.html');
});
router.get('/csrf', (req, res) => {
	res.clearCookie('flag', { path: '/' });
	res.sendFile(__dirname + '/public/csrf/csrf.html');
});
router.get('/sesshij', (req, res) => {
	res.sendFile(__dirname + '/public/sesshij/sesshij.html');
});

// Routes for requests on static pages
router.get('/req-flag', (req, res) => {
	res.status(200).json({ message: 'Work in progress!', flag: 'IDidNotRequestThisAbsolutelyNotAFlag' });
});
router.post('/sqlinj-login', staticDb.login);
router.post('/csrf-bugreport', (req, res) => {
	const link = req.body.link;
	if (link.includes('http://localhost:5000/csrf/send?to=attacker&amount=1000000')) {
		res.status(200).send('DoILookLikeATokenMisterReferer?No');
	} else {
		res.status(200).send('Thank you!');
	}
});
router.get('/csrf/send', (req, res) => {
	res.status(200).send('Money sent!');
});
router.post('/sesshij/send', (req, res) => {
	const comment = req.body.comment;
	comments.push(comment);
	res.status(200).send(true);

	simulatePageRendering();

	if (clearCommentsId) {
		clearInterval(clearCommentsId);
	}
	clearComments();
});
router.get('/sesshij-comments', (req, res) => {
	res.status(200).json(comments);
});

function simulatePageRendering() {
	(async () => {
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.setCookie({
			name: 'flag',
			value: 'WhatDoYouMeanYourSession?ItIsOurSession1848',
			domain: 'localhost',
			path: '/'
		});
		await page.goto('http://localhost:5000/sesshij');
		try {
			await page.waitForSelector('.lastComment', { timeout: 5000 });
		} catch (error) {}
		await browser.close();
	})();
}

function clearComments() {
	clearCommentsId = setInterval(async () => {
		comments = [];
	}, 30000); // Clear comments every 30 seconds
}

module.exports = router;
