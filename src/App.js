import React from "react";
import Board from "./components/Board";
import { changeInstrument } from "./utils/Player";
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

function App() {
  const size = 8;
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      <div className="inline-flex items-center">
        <div className="relative p-2">
          <select
            className="text-gray-700 py-3 px-4 pr-8 rounded"
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
        </div>
      </div>
      <div>
        <Board size={size} />
      </div>
    </div>
  );
}

export default App;
