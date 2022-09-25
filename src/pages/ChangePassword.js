import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/ChangePassword.css';

function ChangePassword() {
	const onSubmitClicked = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Helmet>
				<title>Change password</title>
			</Helmet>
			<div className="rootChallenges">
				<Link to="/challenges">
					<img
						src={process.env.PUBLIC_URL + '/images/logo.png'}
						alt="logo"
						className="logoChangePassword"
					></img>
				</Link>
				<div className="changePasswordContainer">
					<h1>Change password</h1>
					<form className="changePasswordForm">
						<div className="oldPasswordContainer">
							<label htmlFor="oldPasswordInput">Old password: </label>
							<input type="password" id="oldPasswordInput" required></input>
						</div>
						<div className="newPasswordContainer">
							<label htmlFor="newPasswordInput">New password: </label>
							<input type="password" id="newPasswordInput" required></input>
						</div>
						<div className="newPasswordAgainContainer">
							<label htmlFor="newPasswordAgainInput">New password again: </label>
							<input type="password" id="newPasswordAgainInput" required></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitChangePasswordFormBtn">
							Change password
						</button>
					</form>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default ChangePassword;
