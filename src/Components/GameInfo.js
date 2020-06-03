import React from "react";

export default ({
  status,
  xPoints,
  oPoints,
  handleSortToggle,
  isAscending,
  moves,
}) => (
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
    <button className="order-button" onClick={() => handleSortToggle()}>
      ⇅ {isAscending ? "descending" : "ascending"}
    </button>
    <ol>{moves}</ol>
  </div>
);
