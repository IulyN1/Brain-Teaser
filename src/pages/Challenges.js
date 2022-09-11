import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import '../styles/Challenges.css';
import ChallengeCard from '../components/ChallengeCard';

function Challenges() {
	return (
		<>
			<Helmet>
				<title>Challenges</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainChallenges">
					<div className="challengesContainer">
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
						<ChallengeCard id={'htmlbtn'} title={'HTML Disabled Buttons'} level={'Easy'} />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenges;
