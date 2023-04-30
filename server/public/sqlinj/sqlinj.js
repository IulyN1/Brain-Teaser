const form = document.querySelector('#loginForm');
const greeting = document.querySelector('#greeting');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	const data = { username, password };
	login(data);
});

const login = async (data) => {
	const response = await fetch('/sqlinj-login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	const result = await response.json();
	greeting.textContent = `Hello, ${result.id}. Have a great day!`;
};
