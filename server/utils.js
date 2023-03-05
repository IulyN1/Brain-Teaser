const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'myincrediblysecretkey';

/**
 * Middleware function to verify JWT tokens.
 * This middleware should be added to routes that require authentication.
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @param {function} next - (default) callback function for carrying on with the request
 * @returns - 401 error if no token is provided
 *          - 403 error if the token is not valid,
 *          - otherwise carry on with the request
 */
function verifyToken(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: 'No token provided!' });
	}

	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: 'Invalid token!' });
	}
}

/**
 * This function generates a json web token for a user based on a given id that expires in an hour
 * @param {number} id - the user's id
 * @returns {string} - the token generated for the user
 */
function generateToken(id) {
	const token = jwt.sign({ id }, jwtSecret);
	return token;
}

/**
 * Gets the user id from a given json web token by decoding it
 * @param {string} token - the token that needs to be decoded in order to get the id
 * @returns {number} - the user id decoded from the json web token if the decoding is successful
 * 			null - if the decoding is unsuccessful
 */
function getIdFromToken(token) {
	const decoded = jwt.verify(token, jwtSecret);
	if (decoded.id) {
		const uid = parseInt(decoded.id);
		return uid;
	}
	return null;
}

/**
 * This function will hash a password using the bcrypt algorithm with a salt rounds value of 10.
 * @param {string} password - the password that needs to be hashed
 * @returns {string} - the hashed password
 */
async function hashPassword(password) {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

/**
 * This function compares a given password hashed version with another hashed password.
 * @param {string} password1 - the password not hashed
 * @param {string} password2 - the password hashed
 * @returns {boolean} - true if the passwords match, false otherwise
 */
async function comparePasswords(password1, password2) {
	const isSame = await bcrypt.compare(password1, password2);
	return isSame;
}

module.exports = { verifyToken, generateToken, hashPassword, comparePasswords, getIdFromToken };
