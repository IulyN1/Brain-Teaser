import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './styles/App.css';

function App() {
	return (
		<>
			<Helmet>
				<title>Brain Teaser - CTF Platform</title>
			</Helmet>
			<div className="App">
				<div className="header">
					<Link to="/">
						<img src="images/logo.png" alt="logo" className="logo"></img>
					</Link>

					<h1>Brain Teaser - CTF Platform</h1>
					<div className="buttonsContainer">
						<Link to="/">Log in</Link>
						<Link to="/">Sign up</Link>
					</div>
				</div>
				<div className="main">
					<h2>
						Brain Teaser is a CTF (Capture The Flag) platform where people can exercise their web
						cybersecurity knowledge by completing a set of challenges.
					</h2>
					<p>Looking forward to testing your knowledge of cybersecurity on the web?</p>
					<Link to="/challenges">Explore Challenges</Link>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default App;
