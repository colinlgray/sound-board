import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import FFT from "./components/FFT";
import Meter from "./components/Meter";
import Dropdown from "./components/Dropdown";
import Player from "./utils/Player";
import { without } from "lodash";
import "./styles/tailwind.css";
import { maxTimeCount } from "./constants";
import { SynthNameContext } from "./contexts/SynthNameContext";

const initialStep = -1;
const maxSize = maxTimeCount;
const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2";
const synthOptions = ["Synth", "AMSynth", "DuoSynth"];
function App() {
  const [step, setStep] = useState(initialStep);
  const [synthName, setSynthName] = useState(synthOptions[0]);
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

  useEffect(() => {
    loopPlayer.current = new Player(1);
    loopPlayer.current.createLoop(tick);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <Meter />
        <FFT />
        <Meter />
      </div>
      <div className="flex items-center justify-between p-2">
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
            callbackContainer.current.clear.forEach(fn => fn());
          }}
        >
          Clear
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            callbackContainer.current.addRow.forEach(fn => fn());
          }}
        >
          Add row
        </button>
        <Dropdown
          options={synthOptions}
          value={synthName}
          onChange={val => {
            setSynthName(val);
          }}
        />
      </div>
      <SynthNameContext.Provider value={synthName}>
        <Board maxSize={maxSize} step={step} emitter={emitter} />
      </SynthNameContext.Provider>
    </div>
  );
}

export default App;
