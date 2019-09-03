import React from "react";
import clsx from "clsx";

export default function Button(props) {
  let classes = clsx(
    "w-10 h-10 rounded",
    { "bg-gray-400": props.highlight },
    { "bg-gray-700": !props.highlight }
  );
  return (
    <input
      className={classes}
      type="button"
      key={`button-${props.row}-${props.column}`}
      onClick={() => {
        console.log("Clicked button at", props.row, props.column);
      }}
    />
  );
}
