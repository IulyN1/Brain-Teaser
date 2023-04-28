const themeStyle = document.querySelector('#theme-style');
const themeLight = document.querySelector('#theme-light');
const themeDark = document.querySelector('#theme-dark');
const queryParam = 'theme';

themeLight.addEventListener('click', () => {
	themeStyle.setAttribute('href', 'exfilcss-light.css');
});

themeDark.addEventListener('click', () => {
	themeStyle.setAttribute('href', 'exfilcss-dark.css');
});

function setThemeOnLoad(name) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let themeValue = urlParams.get(name);
	console.log(themeValue);
	if (themeValue === 'light' || !themeValue) {
		themeStyle.setAttribute('href', 'exfilcss-light.css');
	} else if (themeValue === 'dark') {
		themeStyle.setAttribute('href', 'exfilcss-dark.css');
	}
	//other
	else {
		themeStyle.setAttribute('href', 'exfilcss-other.css');
	}
}

setThemeOnLoad(queryParam);
