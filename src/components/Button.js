import React, { useEffect } from "react";
import clsx from "clsx";
import { scheduleNote } from "../utils/Player";

export default function Button(props) {
  useEffect(() => {
    if (props.highlight) {
      scheduleNote(props.row, props.column);
    }
  }, [props.highlight, props.row, props.column]);
  let classes = clsx(
    "w-10 h-10 rounded cursor-pointer",
    { [`bg-${props.color.toLowerCase()}-400`]: props.highlight },
    { [`bg-${props.color.toLowerCase()}-700`]: !props.highlight }
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
