import './styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className="headerComponent">
			<Link to="/challenges">
				<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logo"></img>
			</Link>
			<div className="buttonsContainer">
				<Link to="/challenges">Log in</Link>
				<Link to="/challenges">Sign up</Link>
			</div>
		</div>
	);
}

export default Header;
