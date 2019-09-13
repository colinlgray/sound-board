import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import {
  changeInstrument,
  startLoop,
  stopLoop,
  createLoop
} from "./utils/Player";
import "./styles/tailwind.css";
const instruments = [
  "Synth",
  "AMSynth",
  "DuoSynth",
  "FMSynth",
  "MembraneSynth",
  "MetalSynth",
  "MonoSynth",
  "NoiseSynth",
  "PluckSynth",
  "PolySynth"
];

const size = 8;
const initialStep = -1;
function App() {
  const [step, setStep] = useState(0);
  const refContainer = useRef(step);

  const tick = () => {
    let newVal;
    if (refContainer.current + 1 < size) {
      newVal = refContainer.current + 1;
    } else {
      newVal = 0;
    }
    refContainer.current = newVal;
    setStep(refContainer.current);
  };

  useEffect(() => {
    createLoop(tick);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="flex items-center justify-between p-2">
        <select
          className="text-gray-700 rounded"
          id="grid-state"
          onChange={e => {
            changeInstrument(e.target.value);
          }}
        >
          {instruments.map(c => (
            <option key={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            startLoop(tick);
          }}
        >
          Start
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            stopLoop();

            refContainer.current = initialStep;
            setStep(initialStep);
          }}
        >
          Stop
        </button>
      </div>
      <div className="p-4">
        <Board size={size} step={step} />
      </div>
    </div>
  );
}

export default App;
