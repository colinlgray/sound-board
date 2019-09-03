import React from "react";
import clsx from "clsx";

export default function Button(props) {
  let classes = clsx(
    "w-10 h-10 rounded",
    { "bg-gray-400": props.highlight },
    { "bg-gray-700": !props.highlight }
  );
  return (
    <div
      style={{ transition: "background-color 400ms ease" }}
      className={classes}
      key={`button-${props.row}-${props.column}`}
    ></div>
  );
}
