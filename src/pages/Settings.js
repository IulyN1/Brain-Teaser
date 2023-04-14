import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Settings.css';
import { getStats } from '../API';

function Settings() {
	const token = localStorage.getItem('token');
	const [stats, setStats] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			if (!token) {
				alert('You should log in first!');
				navigate('/login');
			} else {
				const stats = await getStats(token);
				setStats(stats);
			}
		})();
	}, [navigate, token]);

	return (
		<>
			<Helmet>
				<title>Settings</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainSettings">
					<Link to="/challenges">Back to challenges</Link>
					<h1>Hello, {stats.user}!</h1>
					<div className="statsContainer">
						<h2>Your stats</h2>
						<h4>
							Total points: <span>{stats.points}</span>
						</h4>
						<h4>
							No. of challenges completed: <span>{stats.completed}</span>
						</h4>
						<h4>
							No. of submissions: <span>{stats.submissions}</span>
						</h4>
						<h4>
							Rate of success: <span>{stats.rate}%</span>
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
