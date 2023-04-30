const el = document.getElementById('comment');
const btn = document.getElementById('submitBtn');

btn.addEventListener('click', (e) => {
	const value = el.value;
	if (value) {
		const newEl = document.createElement('p');
		newEl.innerHTML = value;
		document.body.appendChild(newEl);
	}
});
