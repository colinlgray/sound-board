import React from "react";
import Button from "./Button";

const size = 5;

export default function Board() {
  const domEl = [];
  for (let i = 0; i < size; i++) {
    let inner = [];
    for (let j = 0; j < size; j++) {
      inner.push(<Button key={`button-${i}-${j}`} row={i} column={j} />);
    }
    domEl.push(inner);
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 40px 40px 40px 40px ",
        gridTemplateRows: "40px 40px 40px 40px 40px "
      }}
    >
      {domEl}
    </div>
  );
}
