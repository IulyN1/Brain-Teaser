import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import '../styles/Challenge.css';
import { Link } from 'react-router-dom';
import Difficulty from '../components/Difficulty';
import { useState } from 'react';

function Challenge(props) {
	const [isAnswered, setIsAnswered] = useState('');
	const [inputValue, setInputValue] = useState('');
	const url = '/challenges/solve/' + props.id;

	const onSubmitClicked = (e) => {
		e.preventDefault();
		const correctFlag = ''; // TO DO: get correct flag from api giving the challenge id

		if (correctFlag === inputValue) {
			setIsAnswered('correct');
		} else {
			setIsAnswered('wrong');
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

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
					<div className="submissionContainer">
						<h3>Submission</h3>
						<textarea
							rows={4}
							cols={40}
							className="inputAreaFlag"
							value={inputValue}
							onChange={handleInputChange}
							placeholder={'Insert the flag here...'}
						></textarea>
						<button className="submitFlagBtn" onClick={onSubmitClicked}>
							Submit response
						</button>
						{isAnswered ? (
							isAnswered === 'correct' ? (
								<h5 className="feedbackCorrect">Your response is correct!</h5>
							) : (
								<h5 className="feedbackWrong">Your response is incorrect!</h5>
							)
						) : (
							''
						)}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenge;
