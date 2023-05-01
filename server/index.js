const { verifyToken, sanitizeInputs } = require('./utils');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const db = require('./queries');
const staticRoutes = require('./staticRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use('/', staticRoutes);

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"]
			}
		}
	})
);

app.get('/challenges', db.getChallenges);
app.post('/login', sanitizeInputs, db.login);
app.post('/register', sanitizeInputs, db.register);
app.post('/change-password', sanitizeInputs, verifyToken, db.changePassword);
app.post('/check-flag', sanitizeInputs, verifyToken, db.checkFlag);
app.get('/stats', verifyToken, db.getStats);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
