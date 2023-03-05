import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ChangePassword.css';
import { changePassword } from '../API';

function ChangePassword() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [newPassAgain, setNewPassAgain] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, [navigate, token]);

	const onSubmitClicked = async (e) => {
		e.preventDefault();

		if (oldPass && newPass) {
			if (newPass === newPassAgain) {
				const response = await changePassword(token, oldPass, newPass);
				const parsedResponse = await response.json();
				if (response.status === 200) {
					localStorage.removeItem('token');
					setErrorMessage('');
					navigate('/login');
				} else if (response.status === 404) {
					setErrorMessage(parsedResponse.message);
				}
			} else {
				setErrorMessage('The new password does not match!');
			}
		} else {
			setErrorMessage('Password fields cannot be empty!');
		}
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
							<input
								type="password"
								id="oldPasswordInput"
								required
								value={oldPass}
								onChange={(e) => {
									setOldPass(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<div className="newPasswordContainer">
							<label htmlFor="newPasswordInput">New password: </label>
							<input
								type="password"
								id="newPasswordInput"
								required
								value={newPass}
								onChange={(e) => {
									setNewPass(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<div className="newPasswordAgainContainer">
							<label htmlFor="newPasswordAgainInput">New password again: </label>
							<input
								type="password"
								id="newPasswordAgainInput"
								required
								value={newPassAgain}
								onChange={(e) => {
									setNewPassAgain(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitChangePasswordFormBtn">
							Change password
						</button>
					</form>
					{errorMessage && <span className="errorMessageChangePass">{errorMessage}</span>}
				</div>
				<Footer />
			</div>
		</>
	);
}

export default ChangePassword;
