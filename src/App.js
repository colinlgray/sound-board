import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Player from "./utils/Player";
import "./styles/tailwind.css";

const initialStep = -1;
const size = 8;
const initialRows = [{ instrument: "Synth", note: "F4" }];
function App() {
  const [step, setStep] = useState(initialStep);
  const [rows] = useState(initialRows);
  const stepContainer = useRef(step);
  const callbackContainer = useRef([]);

  const emitter = {
    addEventListener: (event, fn) => {
      if (!callbackContainer.current[event]) {
        callbackContainer.current[event] = [];
      }
      callbackContainer.current.push(fn);
    },
    clearCallbacks: event => {
      callbackContainer.current[event] = [];
    }
  };

  const tick = () => {
    let newVal;
    if (stepContainer.current + 1 < size) {
      newVal = stepContainer.current + 1;
    } else {
      newVal = 0;
    }
    stepContainer.current = newVal;
    setStep(stepContainer.current);
  };

  useEffect(() => {
    Player.createLoop(tick);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            Player.startLoop();
          }}
        >
          Start
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            Player.stopLoop();

            stepContainer.current = initialStep;
            setStep(initialStep);
          }}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            callbackContainer.current.forEach(fn => fn());
          }}
        >
          Clear
        </button>
      </div>
      <div className="p-4">
        <Board size={size} step={step} emitter={emitter} instruments={rows} />
      </div>
      <div className="p-4">
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
