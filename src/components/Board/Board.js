import React from "react";

import "./Board.scss";

function Board({ className, children }) {
  return <div className={className}>{children}</div>;
}

export default Board;
