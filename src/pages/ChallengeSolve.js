import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/ChallengeSolve.css';
import { getChallengeContent } from '../API';

function ChallengeSolve() {
	const navigate = useNavigate();
	const location = useLocation();
	const challenge = location.state?.challenge;
	const [htmlContent, setHtmlContent] = useState('');

	useEffect(() => {
		if (!challenge) {
			navigate('/challenges');
		}
	}, [challenge, navigate]);

	useEffect(() => {
		const response = getChallengeContent(challenge.challengeId);
		response.then((data) => setHtmlContent(data));
	}, [challenge.challengeId]);

	return (
		<>
			<Helmet>
				<title>{challenge?.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<Link to="/challenges">
					<img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" className="logoSolve"></img>
				</Link>
				<div className="solveChallengeContainer" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
			</div>
		</>
	);
}

export default ChallengeSolve;
