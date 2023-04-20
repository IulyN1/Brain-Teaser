const el = document.getElementById('name');
const el2 = document.getElementById('username');
const flag = 'GetElementByIdOrSomethingLikeThat01';
el.addEventListener('keyup', (e) => {
	const value = e.target.value;
	el2.innerHTML = 'Hello, ' + value + '!';
});
