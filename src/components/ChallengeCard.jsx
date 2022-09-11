import './styles/ChallengeCard.css';
import { Link } from 'react-router-dom';

function ChallengeCard(props) {
	const url = '/challenges/' + props.id;
	const difficulty = 'difficulty' + props.level;

	return (
		<div className="challengeCard">
			<img src="images/logo.png" alt="logo" className="logoCard"></img>
			<div className="challengeCardContent">
				<h3>{props.title}</h3>
				<h4>
					Difficulty: <span className={difficulty}>{props.level}</span>
				</h4>
				<div className="challengeCardStartBtn">
					<Link to={url}>Solve</Link>
				</div>
			</div>
		</div>
	);
}

export default ChallengeCard;
