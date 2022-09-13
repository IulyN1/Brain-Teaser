import './styles/Difficulty.css';

function Difficulty(props) {
	const difficulty = 'difficulty' + props.level;

	return (
		<h4 className="difficultyLabel">
			Difficulty: <span className={difficulty}>{props.level}</span>
		</h4>
	);
}

export default Difficulty;
