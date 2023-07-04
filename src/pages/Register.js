import { useState } from 'react';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { register } from '../API';

function Register() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [passAgain, setPassAgain] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmitClicked = async (e) => {
		e.preventDefault();

		if (email && pass) {
			if (pass === passAgain) {
				if (pass.length < 6) {
					setErrorMessage('Password should be at least 6 characters long!');
					return;
				}
				const response = await register(email, pass);
				const parsedResponse = await response.json();
				if (response.status === 200 && parsedResponse) {
					localStorage.removeItem('token');
					setErrorMessage('');
					navigate('/login');
				} else {
					setErrorMessage(
						parsedResponse?.message ? parsedResponse.message : 'An unknown error has occurred!'
					);
				}
			} else {
				setErrorMessage('The passwords do not match!');
			}
		} else {
			setErrorMessage('Email and password cannot be empty!');
		}
	};

	return (
		<>
			<Helmet>
				<title>Register</title>
			</Helmet>
			<div className="rootChallenges">
				<Link to="/challenges">
					<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logoRegister"></img>
				</Link>
				<div className="registerContainer">
					<h1>Register</h1>
					<form className="registerForm" autoComplete="off">
						<div className="emailContainerRegister">
							<label htmlFor="emailInputRegister">Email: </label>
							<input
								type="email"
								id="emailInputRegister"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<div className="passwordContainerRegister">
							<label htmlFor="passwordInputRegister">Password: </label>
							<input
								type="password"
								id="passwordInputRegister"
								required
								value={pass}
								onChange={(e) => {
									setPass(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<div className="passwordAgainContainer">
							<label htmlFor="passwordAgainInput">Password again: </label>
							<input
								type="password"
								id="passwordAgainInput"
								required
								value={passAgain}
								onChange={(e) => {
									setPassAgain(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitRegisterFormBtn">
							Register
						</button>
					</form>
					<Link to="/login">
						<h5>Already have an account? Log in here!</h5>
					</Link>
					{errorMessage && <span className="errorMessageRegister">{errorMessage}</span>}
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Register;
