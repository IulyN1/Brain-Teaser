import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Challenge.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Difficulty from '../components/Difficulty';
import { baseUrl, checkFlag } from '../API';

function Challenge() {
	const token = localStorage.getItem('token');
	const [isAnswered, setIsAnswered] = useState('');
	const [flagValue, setFlagValue] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const challenge = location.state?.challenge;
	const url = baseUrl + challenge?.challengeId;

	useEffect(() => {
		if (!challenge) {
			navigate('/challenges');
		}
	}, [challenge, navigate]);

	const onSubmitClicked = async (e) => {
		e.preventDefault();

		if (!token) {
			alert('You should log in first!');
			navigate('/login');
		} else {
			const response = await checkFlag(token, challenge.challengeId, flagValue);
			if (response) {
				setIsAnswered('correct');
			} else {
				setIsAnswered('wrong');
			}
		}
	};

	return (
		<>
			<Helmet>
				<title>{challenge?.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainChallenge">
					<h1>{challenge?.title}</h1>
					<div className="challengeSubtitle">
						<Difficulty level={challenge?.level} />
						<h4>
							Points: <span className="pointsValue">{challenge?.points}</span>
						</h4>
					</div>
					<div>
						<div className="challengeDescriptionContainer">
							<h3>Problem Statement</h3>
							<p>{challenge?.description}</p>
						</div>
						<div className="challengeLinkContainer">
							<p>
								Challenge link:{' '}
								<span className="challengeLinkLabel">
									<a href={url} target="_blank" rel="noopener noreferrer">
										here
									</a>
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
							value={flagValue}
							onChange={(e) => {
								setFlagValue(e.target.value);
							}}
							placeholder={'Insert the flag here...'}
							spellCheck="false"
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
							<h5>{}</h5>
						)}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenge;
