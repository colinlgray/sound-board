import React, { useEffect } from "react";
import clsx from "clsx";
import Player from "../utils/Player";

export default function Button(props) {
  // Play note when selected
  useEffect(() => {
    if (props.highlight && props.clicked) {
      Player.play(props.row, props.column);
    }
  }, [props.highlight, props.clicked, props.row, props.column]);
  let classes = clsx(
    "w-10 h-10 rounded cursor-pointer",
    {
      [`bg-${props.color.toLowerCase()}-400`]: props.highlight || props.clicked
    },
    {
      [`bg-${props.color.toLowerCase()}-700`]:
        !props.highlight && !props.clicked
    }
  );
  return (
    <div
      style={{ transition: "background-color 400ms ease" }}
      className={classes}
      key={`button-${props.row}-${props.column}`}
      onClick={props.onClick}
    ></div>
  );
}
