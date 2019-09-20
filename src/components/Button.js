import React, { useEffect, useCallback } from "react";
import clsx from "clsx";
import { mSynth, addNoteListener, removeNoteListener } from "../utils/Player";

export default function Button(props) {
  const playNote = useCallback(() => {
    mSynth.triggerAttackRelease(props.note, `${props.time}n`);
  }, [props.note, props.time]);

  // Play note when selected
  useEffect(() => {
    if (props.highlight && props.clicked) {
      playNote();
    }
  }, [props.highlight, props.clicked, playNote]);
  const lookForEvt = useCallback(
    note => {
      if (props.highlight) {
        // TODO: Set value when highlighted
        // Currently the props.highlight is wrong
        console.log("set to", props.note);
      }
    },
    [props.note, props.highlight]
  );

  useEffect(() => {
    addNoteListener(lookForEvt);
    return () => {
      removeNoteListener(lookForEvt);
    };
  }, [props.note, lookForEvt]);

  let classes = clsx(
    "w-10 h-10 rounded cursor-pointer flex items-center justify-center",
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
      style={{ transition: "background-color 400ms ease", textAlign: "center" }}
      className={classes}
      key={`button-${props.row}-${props.column}`}
      onClick={() => {
        playNote();
        props.onClick();
      }}
    >
      {props.note}
    </div>
  );
}
