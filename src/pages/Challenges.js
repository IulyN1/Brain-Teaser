import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

function Challenges() {
	return (
		<>
			<Helmet>
				<title>Challenges</title>
				<link rel="stylesheet" href="./styles/Challenges.css"></link>
			</Helmet>
			<div className="rootChallenges">
				<div className="mainChallenges">
					<h1>Challenges</h1>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Challenges;
