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
						<div className="menuItem">
							<Link to="/settings">
								<img
									src={process.env.PUBLIC_URL + '/images/settings.png'}
									alt="settings"
									className="menuIcon"
								/>
								<span>Settings</span>
							</Link>
						</div>
						<div className="menuItem">
							<Link to="/login" onClick={onLogoutClicked}>
								<img
									src={process.env.PUBLIC_URL + '/images/logout.png'}
									alt="logout"
									className="menuIcon"
								/>
								<span>Logout</span>
							</Link>
						</div>
					</div>
				</div>
				<Link to="/login">Log in</Link>
				<Link to="/register">Sign up</Link>
			</div>
		</div>
	);
}

export default Header;
