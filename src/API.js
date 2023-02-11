const baseUrl = 'http://localhost:5000/';

export async function getChallenges() {
	return await (await fetch(`${baseUrl}challenges`)).text();
}

export async function getChallenge(id) {
	return await (await fetch(`${baseUrl}challenges/${id}`)).text();
}
