import React from "react";
import clsx from "clsx";

function Key(props) {
  return (
    <div
      className={clsx(
        "w-4 m-2",
        { "h-20": props.color === "white" },
        { "h-10": props.color === "black" }
      )}
      role="button"
      style={{ background: props.color, border: "1px solid gray" }}
    />
  );
}

function KeyGroup(props) {
  const els = [];
  els.push(<Key color="white" key={`key-`} />);
  for (let index = 0; index < props.size; index++) {
    els.push(<Key color="black" key={`key-${index * props.size + index}`} />);
    els.push(
      <Key color="white" key={`key-${index * props.size + index + 1}`} />
    );
  }
  return els;
}

export default function Keyboard() {
  return (
    <div className="flex">
      <KeyGroup size={2} />
      <KeyGroup size={3} />
    </div>
  );
}
