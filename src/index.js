import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	const className = 'square' + (props.highlight ? ' highlight' : '') + (props.value === 'X' ? ' x' : ' o');
	return (
		<button
			className={className}
			onClick={props.onClick}
		>
			<div>{props.value}</div>
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		const winLine = this.props.winLine;
		return (
			<Square
				key={i} // To avoid the Warning: Each child in a list should have a unique "key" prop.
				value={this.props.squares[i]}
				onClick = {() => this.props.onClick(i)}
				highlight = {winLine && winLine.includes(i)}
			/>
		);
	}

	render() {
		const boardSize = 3;
		let squares = [];
		for (let i=0; i<boardSize; i++) {
			let row = [];
			for (let j=0; j<boardSize; j++) {
				row.push(this.renderSquare(i * boardSize + j));
			}
			squares.push(<div key={i} className="board-row">{row}</div>);
		}
		return <div>{squares}</div>;
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
			isAscending: true,
			xPoints: 0,
			oPoints: 0,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares).winner || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		const winner = calculateWinner(squares).winner;
		this.updateScore(winner);
		this.setState({
			history: history.concat([{
				squares: squares,
				lastMove: i
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	handleSortToggle() {
		this.setState({
			isAscending: !this.state.isAscending
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: !(step % 2),
		});
	}

	updateScore(winner) {
		if (winner === 'X') {
			this.setState({
				xPoints: this.state.xPoints + 1,
			});
		}
		else if (winner === 'O') {
			this.setState({
				oPoints: this.state.oPoints + 1,
			});
		}
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const info = calculateWinner(current.squares);
		const winner = info.winner;
		const line = info.line;
		const isDraw = info.isDraw;
		const xPoints = this.state.xPoints;
		const oPoints = this.state.oPoints;

		const moves = history.map((step, move) => {
			const lastMove = step.lastMove;
			const col = lastMove % 3 + 1, row = Math.floor(lastMove / 3) + 1;
			const desc = move ?
			'Go to move #' + move + ' (' + col + ', ' + row + ')':
			'Go to game start';
			return (
				<li key={move}>
					<button
						className = {move === this.state.stepNumber ? 'currently-selected-item' : ''}
						onClick={() => this.jumpTo(move)}>{desc}
					</button>
				</li>
			);
		});

		const isAscending = this.state.isAscending;
		if (!isAscending) {
			moves.reverse();
		}

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		}
		else if(isDraw) {
			status = "Draw";
		}
		else{
			status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className="game">
				<div className="game-board-container">
					<div className="game-board">
						<Board
							squares = {current.squares}
							onClick={(i) => this.handleClick(i)}
							winLine={line}
						/>
					</div>
				</div>
				<div className="game-info">
					<div className="status">{status}</div>
					<div className="scoreboard-container">
						<table className="scoreboard">
							<thead>
								<tr>
									<th className="x">X</th>
									<th className="o">O</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{xPoints}</td>
									<td>{oPoints}</td>
								</tr>
							</tbody>
						</table>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																					
					</div>
					<button className="order-button" onClick={()=>this.handleSortToggle()}>
						⇅ {isAscending ? 'descending' : 'ascending'}
					</button>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let isVictory = false;
	let allLines = [];
	let winner;
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			winner = squares[a];
			Array.prototype.push.apply(allLines, lines[i])
			isVictory = true;
		}
	}
	if (isVictory) {
		return {
			winner: winner,
			line: allLines,
			isDraw: false
		};
	}

	let isDraw = true;
	if (squares.filter(x => x === null).length !== 0) {
		isDraw = false;
	}

	return {
		winner: null,
		line: null,
		isDraw: isDraw,
	};
}