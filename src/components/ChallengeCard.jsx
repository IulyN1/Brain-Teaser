import './styles/ChallengeCard.css';
import { Link } from 'react-router-dom';
import Difficulty from './Difficulty';

function ChallengeCard(props) {
	const url = '/challenges/' + props.id;

	return (
		<div className="challengeCard">
			<img src="images/logo.png" alt="logo" className="logoCard"></img>
			<div className="challengeCardContent">
				<h3>{props.title}</h3>
				<Difficulty level={props.level} />
				<div className="challengeCardStartBtn">
					<Link to={url}>Solve</Link>
				</div>
			</div>
		</div>
	);
}

export default ChallengeCard;
