import React, { useEffect, useCallback } from "react";
import clsx from "clsx";
import { loopSynth } from "../utils/Player";

export default function Button(props) {
  const playNote = useCallback(() => {
    loopSynth.triggerAttackRelease(props.note, `${props.time}n`);
  }, [props.note, props.time]);

  // Play note when selected
  useEffect(() => {
    if (props.highlight && props.clicked) {
      playNote();
    }
  }, [props.highlight, props.clicked, playNote]);
  const recording = props.clicked && !props.note;
  const color = recording ? "red" : "gray";
  let colorWeight = 700;
  if (recording) {
    colorWeight = 800;
  } else if (props.highlight && props.clicked) {
    colorWeight = 300;
  } else if (props.highlight || props.clicked) {
    colorWeight = 400;
  }
  let classes = `w-10 h-10 rounded cursor-pointer flex items-center justify-center bg-${color}-${colorWeight}`;
  return (
    <div
      style={{ transition: "background-color 400ms ease", textAlign: "center" }}
      className={classes}
      key={`button-${props.row}-${props.column}`}
      onClick={props.onClick}
    >
      {props.note}
    </div>
  );
}
