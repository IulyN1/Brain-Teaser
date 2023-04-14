export const baseUrl = 'http://localhost:5000/';

export async function getChallenges() {
	return await (await fetch(`${baseUrl}challenges`)).text();
}

export async function login(email, password) {
	const response = await fetch(`${baseUrl}login`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}

export async function register(email, password) {
	const response = await fetch(`${baseUrl}register`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}

export async function changePassword(token, oldPassword, newPassword) {
	const response = await fetch(`${baseUrl}change-password`, {
		method: 'POST',
		body: JSON.stringify({
			oldPassword,
			newPassword
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	return response;
}

export async function checkFlag(token, challengeId, flag) {
	const response = await fetch(`${baseUrl}check-flag`, {
		method: 'POST',
		body: JSON.stringify({
			challengeId,
			flag
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	return response.json();
}

export async function getStats(token) {
	const response = await fetch(`${baseUrl}stats`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response.json();
}
