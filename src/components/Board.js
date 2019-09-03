import React from "react";
import Button from "./Button";
import { player } from "../utils/Player";

export default function Board(props) {
  const handleClick = (row, column) => {
    player.play(row * props.size + column);
  };

  const domEl = [];
  const { size, step } = props;
  for (let i = 0; i < size; i++) {
    let inner = [];
    for (let j = 0; j < size; j++) {
      inner.push(
        <Button
          key={`button-${i}-${j}`}
          row={i}
          column={j}
          highlight={step === j}
          onClick={() => {
            handleClick(i, j);
          }}
        />
      );
    }
    domEl.push(inner);
  }
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        display: "grid",
        gridGap: "8px"
      }}
    >
      {domEl}
    </div>
  );
}
