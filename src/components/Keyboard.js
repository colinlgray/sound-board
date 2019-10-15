import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./Keyboard.css";
import usePlayer from "../hooks/usePlayer";

const initialKeyState = [
  { color: "white", note: "C4", pressed: false, shortcut: "a" },
  { color: "black", note: "C#4", pressed: false, shortcut: "w" },
  { color: "white", note: "D4", pressed: false, shortcut: "s" },
  { color: "black", note: "D#4", pressed: false, shortcut: "e" },
  { color: "white", note: "E4", pressed: false, shortcut: "d" },
  { color: "white", note: "F4", pressed: false, shortcut: "f" },
  { color: "black", note: "F#4", pressed: false, shortcut: "t" },
  { color: "white", note: "G4", pressed: false, shortcut: "g" },
  { color: "black", note: "G#4", pressed: false, shortcut: "y" },
  { color: "white", note: "A4", pressed: false, shortcut: "h" },
  { color: "black", note: "A#4", pressed: false, shortcut: "u" },
  { color: "white", note: "B4", pressed: false, shortcut: "j" },
  { color: "white", note: "C5", pressed: false, shortcut: "A" },
  { color: "black", note: "C#5", pressed: false, shortcut: "W" },
  { color: "white", note: "D5", pressed: false, shortcut: "S" },
  { color: "black", note: "D#5", pressed: false, shortcut: "E" },
  { color: "white", note: "E5", pressed: false, shortcut: "D" },
  { color: "white", note: "F5", pressed: false, shortcut: "F" },
  { color: "black", note: "F#5", pressed: false, shortcut: "T" },
  { color: "white", note: "G5", pressed: false, shortcut: "G" },
  { color: "black", note: "G#5", pressed: false, shortcut: "Y" },
  { color: "white", note: "A5", pressed: false, shortcut: "H" },
  { color: "black", note: "A#5", pressed: false, shortcut: "U" },
  { color: "white", note: "B5", pressed: false, shortcut: "J" }
];

const classes = {
  white: "h-40 z-0 key-white",
  black: "h-20 z-10 key-black"
};

function Key(props) {
  useEffect(() => {
    const downListener = e => {
      if (e.key !== props.shortcut) return;
      props.onAttack();
    };
    const upListener = e => {
      if (e.key !== props.shortcut) return;
      props.onRelease();
    };

    window.addEventListener("keydown", downListener);
    window.addEventListener("keyup", upListener);
    return () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
  }, [props]);

  return (
    <div
      className={clsx(
        "border-2 border-gray w-8 -ml-4",
        props.className,
        { "bg-gray-100": props.color === "white" && !props.pressed },
        { "bg-gray-800": props.color === "black" && !props.pressed },
        { "bg-gray-200": props.color === "white" && props.pressed },
        { "bg-gray-700": props.color === "black" && props.pressed },
        classes[props.color]
      )}
      onMouseDown={props.onAttack}
      onMouseUp={props.onRelease}
      onMouseLeave={props.onRelease}
      onTouchCancel={props.onRelease}
      onTouchEnd={props.onRelease}
      role="button"
    />
  );
}

export default function Keyboard({ onClick, synthName }) {
  const [keyState, setKeyState] = useState([...initialKeyState]);
  const playerSize = Object.keys(initialKeyState).length;
  const player = usePlayer(playerSize);

  useEffect(() => {
    const releaseLastKeyIfShift = e => {
      let lastFoundIdx = -1;
      if (e.key === "Shift") {
        keyState.forEach((val, idx) => {
          if (val.pressed) {
            lastFoundIdx = idx;
          }
        });
        if (lastFoundIdx >= 0) {
          const clone = [...keyState];
          clone[lastFoundIdx].pressed = false;
          clone[lastFoundIdx] = { ...clone[lastFoundIdx], pressed: false };
          setKeyState(clone);
          player.current.release(clone[lastFoundIdx].note);
        }
      }
    };

    window.addEventListener("keydown", releaseLastKeyIfShift);
    window.addEventListener("keyup", releaseLastKeyIfShift);
    return () => {
      window.removeEventListener("keydown", releaseLastKeyIfShift);
      window.removeEventListener("keyup", releaseLastKeyIfShift);
    };
  }, [keyState, player]);

  const playPressedNotes = board => {
    const keys = board.reduce((memo, keyState) => {
      if (keyState.pressed) {
        return memo.concat(keyState.note);
      }
      return memo;
    }, []);
    if (keys.length > 0) {
      onClick(keys);
      player.current.attack(keys);
    }
  };
  useEffect(() => {
    if (player.current) {
      player.current.changeInstrument(playerSize, synthName);
    }
  }, [synthName, player, playerSize]);
  useEffect(() => {
    const blurListener = () => {
      if (player.current) {
        setKeyState([...initialKeyState]);
        player.current.instrument.releaseAll();
      }
    };

    window.addEventListener("blur", blurListener);
    return () => {
      window.removeEventListener("blur", blurListener);
    };
  }, [player]);

  return (
    <div className="flex justify-center w-full p-4">
      {keyState.map((state, idx) => (
        <Key
          key={idx}
          hightlight={false}
          onAttack={() => {
            if (!keyState[idx].pressed) {
              const clone = [...keyState];
              clone[idx] = { ...clone[idx], pressed: true };
              setKeyState(clone);
              playPressedNotes(clone);
            }
          }}
          onRelease={() => {
            if (keyState[idx].pressed) {
              const clone = [...keyState];
              clone[idx].pressed = false;
              clone[idx] = { ...clone[idx], pressed: false };
              setKeyState(clone);
              player.current.release(state.note);
            }
          }}
          {...state}
        />
      ))}
    </div>
  );
}
