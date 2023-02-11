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

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
