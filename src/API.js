const baseUrl = 'http://localhost:5000/';

export async function getChallenges() {
	return await (await fetch(`${baseUrl}challenges`)).text();
}

export async function getChallenge(id) {
	return await (await fetch(`${baseUrl}challenges/${id}`)).text();
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
	const response = await fetch(`${baseUrl}changePassword`, {
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
