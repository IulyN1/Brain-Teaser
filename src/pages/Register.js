import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
	return (
		<>
			<Helmet>
				<title>Register</title>
			</Helmet>
			<div className="rootChallenges">
				<Link to="/challenges">
					<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logoFormPage"></img>
				</Link>
				<div className="registerContainer"></div>
				<Footer />
			</div>
		</>
	);
}

export default Register;
