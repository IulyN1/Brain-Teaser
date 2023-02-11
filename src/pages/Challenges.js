import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Challenges.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChallengeCard from '../components/ChallengeCard';
import { getChallenges } from '../API';

function Challenges() {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		(async () => {
			let fetchItems = await getChallenges();
			setChallenges(JSON.parse(fetchItems));
		})();
	}, []);

	return (
		<>
			<Helmet>
				<title>Challenges</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainChallenges">
					<div className="challengesContainer">
						{challenges.map((challenge) => (
							<ChallengeCard key={challenge.id} challenge={challenge} />
						))}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenges;
