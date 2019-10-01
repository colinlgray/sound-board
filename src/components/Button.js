import React, { useEffect } from "react";

export default function Button(props) {
  const recording = props.clicked && !props.note;
  const color = recording ? "red" : "gray";

  useEffect(() => {
    if (props.highlight && props.clicked) {
      props.playNote(props.notes, `${props.time}n`);
    }
  }, [props]);

  let colorWeight = 700;
  if (recording) {
    colorWeight = 800;
  } else if (props.highlight && props.clicked) {
    colorWeight = 300;
  } else if (props.highlight || props.clicked) {
    colorWeight = 400;
  }
  let classes = `m-1 w-full h-full rounded cursor-pointer flex items-center justify-center bg-${color}-${colorWeight}`;
  return (
    <div
      style={{ transition: "background-color 400ms ease", textAlign: "center" }}
      className={classes}
      key={`button-${props.row}-${props.column}`}
      onClick={props.onClick}
    >
      {props.notes.join(",")}
    </div>
  );
}
