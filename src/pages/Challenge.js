import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import '../styles/Challenge.css';
import { Link } from 'react-router-dom';
import Difficulty from '../components/Difficulty';

function Challenge(props) {
	const url = '/challenges/solve/' + props.id;

	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainChallenge">
					<h1>{props.title}</h1>
					<div className="challengeSubtitle">
						<Difficulty level={props.level} />
						<h4>
							Points: <span className="pointsValue">{props.points}</span>
						</h4>
					</div>
					<div>
						<div className="challengeDescriptionContainer">
							<h3>Problem Statement</h3>
							<p>{props.description}</p>
						</div>
						<div className="challengeLinkContainer">
							<p>
								Challenge link:{' '}
								<span className="challengeLinkLabel">
									<Link to={url}>here</Link>
								</span>
							</p>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenge;
