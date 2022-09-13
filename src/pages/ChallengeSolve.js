import { Helmet } from 'react-helmet';
import '../styles/ChallengeSolve.css';

function ChallengeSolve(props) {
	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<div className="solveChallengeContainer">{props.id}</div>
			</div>
		</>
	);
}

export default ChallengeSolve;
