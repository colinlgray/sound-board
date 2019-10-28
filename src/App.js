import React, { useState, useEffect, useRef, useCallback } from "react";
import Board from "./components/Board";
import FFT from "./components/FFT";
import Meter from "./components/Meter";
import Dropdown from "./components/Dropdown";
import Player from "./utils/Player";
import { without } from "lodash";
import { map } from "lodash";
import "./styles/tailwind.css";
import { maxTimeCount, synthOptions } from "./constants";

const API_URL =
  "https://ywd48sesva.execute-api.us-east-1.amazonaws.com/dev/sequence";
const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1";
const maxSize = maxTimeCount;
const initialStep = -1;

const getEmptyRow = size => {
  return [
    new Array(size).fill(0).map(() => {
      return { notes: [], synthName: null, clicked: false };
    })
  ];
};

function App() {
  const [step, setStep] = useState(initialStep);
  const [synthName, setSynthName] = useState(synthOptions[0]);
  const [board, setBoard] = useState(getEmptyRow(maxSize));
  const stepContainer = useRef(step);
  const callbackContainer = useRef({ clear: [], addRow: [] });
  const loopPlayer = useRef();

  const emitter = {
    addEventListener: (event, fn) => {
      if (!callbackContainer.current[event]) {
        callbackContainer.current[event] = [];
      }
      callbackContainer.current[event].push(fn);
    },
    removeEventListener: (event, fn) => {
      callbackContainer.current[event] = without(
        callbackContainer.current[event],
        fn
      );
    }
  };

  const tick = () => {
    let newVal;
    if (stepContainer.current + 1 < maxSize) {
      newVal = stepContainer.current + 1;
    } else {
      newVal = 0;
    }
    stepContainer.current = newVal;
    setStep(stepContainer.current);
  };

  const onNotePress = useCallback(
    notes => {
      board.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
          if (el.clicked && !el.notes.length) {
            const clone = [...board];
            clone[rowIdx][colIdx].notes = notes;
            clone[rowIdx][colIdx].synthName = synthName;
            setBoard(clone);
          }
        });
      });
    },
    [board, synthName]
  );

  useEffect(() => {
    // Setup time loop
    loopPlayer.current = new Player(1);
    loopPlayer.current.createLoop(tick);

    // Look for query param
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("sequence")) {
      console.log(
        `TODO: Hit serverless api at:${API_URL}/${urlParams.get("sequence")}`
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="flex items-center justify-between p-1">
        <Meter />
        <FFT />
        <Meter />
      </div>
      <div className="flex items-center justify-between p-1 text-sm">
        <button
          className={buttonClasses}
          onClick={() => {
            loopPlayer.current.constructor.startLoop();
          }}
        >
          Start
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            loopPlayer.current.stopLoop();

            stepContainer.current = initialStep;
            setStep(initialStep);
          }}
        >
          Stop
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const clone = map(board, row => {
              return map(row, val => {
                return { ...val, notes: [], clicked: false };
              });
            });
            setBoard(clone);
          }}
        >
          Clear
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            setBoard(board.concat(getEmptyRow(maxSize)));
          }}
        >
          Add row
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            console.log("not implemented");
          }}
        >
          Save
        </button>
        <Dropdown
          options={synthOptions}
          value={synthName}
          onChange={val => {
            setSynthName(val);
          }}
        />
      </div>
      <Board
        maxSize={maxSize}
        step={step}
        emitter={emitter}
        synthName={synthName}
        board={board}
        onButtonClick={(rowIdx, colIdx) => {
          const clone = [...board];
          clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx].clicked;
          clone[rowIdx][colIdx].notes = [];
          setBoard(clone);
        }}
        onDeleteRow={rowIdx => {
          const clone = [...board];
          clone.splice(rowIdx, 1);
          setBoard(clone);
        }}
        onNotePress={onNotePress}
      />
    </div>
  );
}

export default App;
