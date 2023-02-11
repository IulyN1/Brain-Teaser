import { Link } from 'react-router-dom';
import './styles/ChallengeCard.css';
import Difficulty from './Difficulty';

function ChallengeCard(props) {
	const challenge = props.challenge;
	const url = '/challenges/' + challenge.challengeId;

	return (
		<div className="challengeCard">
			<img src="images/logo.png" alt="logo" className="logoCard"></img>
			<div className="challengeCardContent">
				<h3>{challenge.title}</h3>
				<Difficulty level={challenge.level} />
				<div className="challengeCardStartBtn">
					<Link to={url} state={{ challenge }}>
						Solve
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ChallengeCard;
