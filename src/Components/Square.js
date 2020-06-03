import React from "react";

export default ({ highlight, value, onClick }) => (
  <button
    className={
      "square" + (highlight ? " highlight" : "") + (value === "X" ? " x" : " o")
    }
    onClick={onClick}
  >
    <div>{value}</div>
  </button>
);
