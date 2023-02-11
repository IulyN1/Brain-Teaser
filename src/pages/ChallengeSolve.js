import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ChallengeSolve.css';

function ChallengeSolve() {
	const navigate = useNavigate();
	const location = useLocation();
	const challenge = location.state?.challenge;

	useEffect(() => {
		if (!challenge) {
			navigate('/challenges');
		}
	}, [challenge, navigate]);

	return (
		<>
			<Helmet>
				<title>{challenge?.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<div className="solveChallengeContainer">{challenge?.challengeId}</div>
			</div>
		</>
	);
}

export default ChallengeSolve;
