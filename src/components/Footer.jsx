import './styles/Footer.css';

function Footer() {
	return (
		<div className="footerComponent">
			<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logoFooter"></img>
			<p>Brain Teaser &copy; All rights reserved 2022-2023</p>
		</div>
	);
}

export default Footer;
