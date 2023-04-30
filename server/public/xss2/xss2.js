const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');

if (window.location.href.includes('notfound')) {
	const notFound = document.getElementById('page');
	notFound.innerHTML = page;
} else {
	if (page === 'blog') {
		window.location.href = '/xss2-blog';
	} else if (page) {
		window.location.href = `/xss2-notfound?page=${page}`;
	}
}
