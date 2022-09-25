import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';

function Settings(props) {
	return (
		<>
			<Helmet>
				<title>Settings</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainSettings">
					<Link to="/challenges">Back to challenges</Link>
					<h1>Hello, {props.user}!</h1>
					<div className="statsContainer">
						<h2>Your stats</h2>
						<h4>
							Total points: <span>10</span>
						</h4>
						<h4>
							No. of challenges completed: <span>10</span>
						</h4>
						<h4>
							No. of submissions: <span>10</span>
						</h4>
						<h4>
							Rate of success: <span>10</span>
						</h4>
						<h4>
							Highest challenge streak (in a day): <span>10</span>
						</h4>
					</div>
					<h2>Change password</h2>
					<Link to="/changepassword">Change password</Link>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Settings;
