import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import '../styles/Challenge.css';

function Challenge(props) {
	return (
		<>
			<Helmet>
				<title>{props.title}</title>
			</Helmet>
			<div className="rootChallenges">
				<Header />
				<div className="mainChallenge"></div>
				<Footer />
			</div>
		</>
	);
}

export default Challenge;
