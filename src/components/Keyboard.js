import React, { useEffect } from "react";
import clsx from "clsx";
import "./Keyboard.css";
import Player from "../utils/Player";

const keys = {
  a: { color: "white", note: "C4" },
  w: { color: "black", note: "C#4" },
  s: { color: "white", note: "D4" },
  e: { color: "black", note: "D#4" },
  d: { color: "white", note: "E4" },
  f: { color: "white", note: "F4" },
  t: { color: "black", note: "F#4" },
  g: { color: "white", note: "G4" },
  y: { color: "black", note: "G#4" },
  h: { color: "white", note: "A4" },
  u: { color: "black", note: "A#4" },
  j: { color: "white", note: "B4" },
  A: { color: "white", note: "C5" },
  W: { color: "black", note: "C#5" },
  S: { color: "white", note: "D5" },
  E: { color: "black", note: "D#5" },
  D: { color: "white", note: "E5" },
  F: { color: "white", note: "F5" },
  T: { color: "black", note: "F#5" },
  G: { color: "white", note: "G5" },
  Y: { color: "black", note: "G#5" },
  H: { color: "white", note: "A5" },
  U: { color: "black", note: "A#5" },
  J: { color: "white", note: "B5" }
};

const classes = {
  white: "h-40 z-0 bg-gray-100 key-white",
  black: "h-20 z-10 bg-gray-800 key-black"
};

function Key(props) {
  return (
    <div
      className={clsx(
        "border-2 border-gray w-8 -ml-4",
        props.className,
        classes[props.color]
      )}
      role="button"
      onClick={props.onClick}
    />
  );
}

export default function Keyboard() {
  useEffect(() => {
    const listener = window.addEventListener("keydown", e => {
      if (e.key && keys[e.key]) {
        Player.play("Synth", keys[e.key].note);
      }
    });
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="flex">
      {Object.keys(keys).map((shortCut, idx) => (
        <Key
          color={keys[shortCut].color}
          key={idx}
          onClick={() => {
            Player.play("Synth", keys[shortCut].note);
          }}
        />
      ))}
    </div>
  );
}
