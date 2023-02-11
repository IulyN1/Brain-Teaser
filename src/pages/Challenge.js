import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Challenge.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Difficulty from '../components/Difficulty';

function Challenge() {
	const [isAnswered, setIsAnswered] = useState('');
	const [inputValue, setInputValue] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const challenge = location.state?.challenge;
	const url = '/challenges/solve/' + challenge?.challengeId;

	useEffect(() => {
		if (!challenge) {
			navigate('/challenges');
		}
	}, [challenge, navigate]);

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
									<Link to={url} state={{ challenge }}>
										here
									</Link>
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
