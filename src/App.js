import './App.css';
import Footer from './components/Footer';

function App() {
	return (
		<div className="App">
			<div className="header">
				<a href="index.html">
					<img src="images/logo.png" alt="logo" className="logo"></img>
				</a>
				<h1>Brain Teaser - CTF Platform</h1>
				<div className="buttonsContainer">
					<a href="index.html">Log in</a>
					<a href="index.html">Sign up</a>
				</div>
			</div>
			<div className="main">
				<h2>
					Brain Teaser is a CTF (Capture The Flag) platform where people can exercise their web cybersecurity
					knowledge by completing a set of challenges.
				</h2>
				<p>Looking forward to testing your knowledge of cybersecurity on the web?</p>
				<a href="index.html">Explore Challenges</a>
			</div>
			<Footer />
		</div>
	);
}

export default App;
