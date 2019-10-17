import React, { useEffect } from "react";

export default function Button(props) {
  const { highlight, clicked, notes, time, playNote, synthName } = props;
  const recording = props.clicked && !props.note;
  const color = recording ? "red" : "gray";
  useEffect(() => {
    if (highlight && clicked && notes.length) {
      playNote(synthName, notes, `${time}n`);
    }
  }, [highlight, clicked, notes, time, playNote, synthName]);

  let colorWeight = 700;
  if (props.highlight && props.clicked) {
    colorWeight = 300;
  } else if (props.highlight || props.clicked) {
    colorWeight = 400;
  }
  if (recording) {
    colorWeight += 200;
  }
  let classes = `mx-1 w-full h-full rounded cursor-pointer flex items-center justify-center bg-${color}-${colorWeight}`;
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
