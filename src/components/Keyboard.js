import React, { useEffect, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import "./Keyboard.css";
import { usePlayer } from "../utils/Player";

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
  white: "h-40 z-0 key-white",
  black: "h-20 z-10 key-black"
};

function Key(props) {
  const [hightlight, setHighlight] = useState(false);
  const pressedContainer = useRef(false);
  const attack = useCallback(() => {
    setHighlight(true);
    pressedContainer.current = true;
    props.onAttack();
  }, [props]);
  const release = useCallback(() => {
    setHighlight(false);
    pressedContainer.current = false;
    props.onRelease();
  }, [props]);

  useEffect(() => {
    const downListener = e => {
      if (e.key !== props.shortcut || pressedContainer.current) return;
      attack();
    };
    const upListener = e => {
      if (
        e.key.toLowerCase() !== props.shortcut.toLowerCase() ||
        !pressedContainer.current
      )
        return;
      release();
    };

    window.addEventListener("keydown", downListener);
    window.addEventListener("keyup", upListener);
    return () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keydown", upListener);
    };
  }, [props.shortcut, release, attack]);

  return (
    <div
      className={clsx(
        "border-2 border-gray w-8 -ml-4",
        props.className,
        { "bg-gray-100": props.color === "white" && !hightlight },
        { "bg-gray-800": props.color === "black" && !hightlight },
        { "bg-gray-200": props.color === "white" && hightlight },
        { "bg-gray-700": props.color === "black" && hightlight },
        classes[props.color]
      )}
      onMouseDown={attack}
      onMouseUp={release}
      onMouseLeave={release}
      role="button"
    />
  );
}
export default function Keyboard() {
  const player = usePlayer(Object.keys(keys).length);
  return (
    <div className="flex">
      {Object.keys(keys).map((shortcut, idx) => (
        <Key
          color={keys[shortcut].color}
          key={idx}
          shortcut={shortcut}
          onAttack={() => {
            player.current.attack(keys[shortcut].note);
          }}
          onRelease={() => {
            player.current.release(keys[shortcut].note);
          }}
        />
      ))}
    </div>
  );
}
