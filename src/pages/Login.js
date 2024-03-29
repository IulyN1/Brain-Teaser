import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { login } from '../API';

function Login() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (token) {
			navigate('/challenges');
		}
	}, [navigate, token]);

	const onSubmitClicked = async (e) => {
		e.preventDefault();

		if (email && pass) {
			if (pass.length < 6) {
				setErrorMessage('Password should be at least 6 characters long!');
				return;
			}
			const response = await login(email, pass);
			const parsedResponse = await response.json();
			if (response.status === 200 && parsedResponse.token) {
				localStorage.setItem('token', parsedResponse.token);
				setErrorMessage('');
				navigate('/challenges');
			} else {
				setErrorMessage('Invalid combination of email and password!');
			}
		} else {
			setErrorMessage('Email and password cannot be empty!');
		}
	};

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<div className="rootChallenges">
				<Link to="/challenges">
					<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logoLogin"></img>
				</Link>
				<div className="loginContainer">
					<h1>Login</h1>
					<form className="loginForm" autoComplete="off">
						<div className="emailContainerLogin">
							<label htmlFor="emailInputLogin">Email: </label>
							<input
								type="email"
								id="emailInputLogin"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<div className="passwordContainerLogin">
							<label htmlFor="passwordInputLogin">Password: </label>
							<input
								type="password"
								id="passwordInputLogin"
								required
								value={pass}
								onChange={(e) => {
									setPass(e.target.value);
									setErrorMessage('');
								}}
							></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitLoginFormBtn">
							Login
						</button>
					</form>
					<Link to="/register">
						<h5>Don't have an account? Create one here!</h5>
					</Link>
					{errorMessage && <span className="errorMessageLogin">{errorMessage}</span>}
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Login;
