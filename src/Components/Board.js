import React from "react";
import Square from "./Square";

export default (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        highlight={props.winLine && props.winLine.includes(i)}
      />
    );
  };

  const boardSize = 3;
  let squares = [];
  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(renderSquare(i * boardSize + j));
    }
    squares.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }
  return <div>{squares}</div>;
};
