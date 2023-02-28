import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
	const onSubmitClicked = (e) => {
		e.preventDefault();
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
							<input type="email" id="emailInputRegister" required></input>
						</div>
						<div className="passwordContainerRegister">
							<label htmlFor="passwordInputRegister">Password: </label>
							<input type="password" id="passwordInputRegister" required></input>
						</div>
						<div className="passwordAgainContainer">
							<label htmlFor="passwordAgainInput">Password again: </label>
							<input type="password" id="passwordAgainInput" required></input>
						</div>
						<button type="submit" onClick={onSubmitClicked} className="submitRegisterFormBtn">
							Register
						</button>
					</form>
					<Link to="/login">
						<h5>Already have an account? Log in here!</h5>
					</Link>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Register;
