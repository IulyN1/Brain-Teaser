import './styles/Difficulty.css';

const difficultyMapper = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

function Difficulty(props) {
	const difficultyLevel = difficultyMapper[props.level];
	const difficulty = 'difficulty' + difficultyLevel;

	return (
		<h4 className="difficultyLabel">
			Difficulty: <span className={difficulty}>{difficultyLevel}</span>
		</h4>
	);
}

export default Difficulty;
