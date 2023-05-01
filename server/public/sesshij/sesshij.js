const el = document.getElementById('comment');
const btn = document.getElementById('submitBtn');
const container = document.getElementById('comments');

const renderComments = async () => {
	container.innerHTML = '';
	const response = await fetch('/sesshij-comments');
	const comments = await response.json();

	comments.forEach((comment, index, array) => {
		const newEl = document.createElement('p');
		if (index === array.length - 1) {
			newEl.className = 'lastComment';
		}
		newEl.innerHTML = comment;
		container.appendChild(newEl);
	});
};

window.addEventListener('DOMContentLoaded', renderComments);

btn.addEventListener('click', async (e) => {
	const comment = el.value;
	const response = await fetch('/sesshij/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ comment })
	});
	const result = await response.text();
	if (result) {
		renderComments();
	}
});
