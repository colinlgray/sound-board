import React from "react";
import Button from "./Button";

const size = 5;

export default function Board() {
  const domEl = [];
  for (let i = 0; i < size; i++) {
    let inner = [];
    for (let j = 0; j < size; j++) {
      inner.push(<Button row={i} column={j} />);
    }
    domEl.push(inner);
  }
  return <div>{domEl}</div>;
}
