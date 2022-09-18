import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
	const onSubmitClicked = (e) => {
		e.preventDefault();
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
					<form className="loginForm">
						<div className="emailContainerLogin">
							<label htmlFor="emailInputLogin">Email: </label>
							<input type="email" id="emailInputLogin" required></input>
						</div>
						<div className="passwordContainerLogin">
							<label htmlFor="passwordInputLogin">Password: </label>
							<input type="password" id="passwordInputLogin" required></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitLoginFormBtn">
							Login
						</button>
					</form>
					<Link to="/register">
						<h5>Don't have an account? Create one here!</h5>
					</Link>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Login;
