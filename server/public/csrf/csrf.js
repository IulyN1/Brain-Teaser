const linkInput = document.querySelector('#link');
const toInput = document.querySelector('#to');
const amountInput = document.querySelector('#amount');
const reportBtn = document.querySelector('#reportBtn');
const sendBtn = document.querySelector('#sendBtn');
const sendMsg = document.querySelector('#sendResponse');
const reportMsg = document.querySelector('#reportResponse');
const money = document.querySelector('#money');

sendBtn.addEventListener('click', async () => {
	const to = toInput.value;
	const amount = amountInput.value;
	const response = await fetch(
		'/csrf/send?' +
			new URLSearchParams({
				to,
				amount
			})
	);
	const result = await response.text();
	sendMsg.textContent = result;
});

reportBtn.addEventListener('click', async () => {
	const link = linkInput.value;
	const response = await fetch('/csrf-bugreport', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ link })
	});
	const result = await response.text();
	reportMsg.textContent = result;

	if (result !== 'Thank you!') {
		money.textContent = '1000100';
	}
});
