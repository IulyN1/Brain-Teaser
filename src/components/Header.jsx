import './styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
	const onLogoutClicked = (e) => {
		console.log('logout');
	};

	return (
		<div className="headerComponent">
			<Link to="/challenges">
				<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logo"></img>
			</Link>
			<div className="buttonsContainer">
				<div className="dropdown">
					<Link to="/settings">
						<img src={process.env.PUBLIC_URL + '/images/user.png'} alt="profile" className="profileIcon" />
					</Link>
					<div className="dropdownMenu">
						<Link to="/settings">
							<div className="menuItem">
								<img
									src={process.env.PUBLIC_URL + '/images/settings.png'}
									alt="settings"
									className="menuIcon"
								/>
								<span>Settings</span>
							</div>
						</Link>
						<Link to="/login" onClick={onLogoutClicked}>
							<div className="menuItem">
								<img
									src={process.env.PUBLIC_URL + '/images/logout.png'}
									alt="logout"
									className="menuIcon"
								/>
								<span>Logout</span>
							</div>
						</Link>
					</div>
				</div>
				<Link to="/login">Log in</Link>
				<Link to="/register">Sign up</Link>
			</div>
		</div>
	);
}

export default Header;
