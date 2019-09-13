import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import Player from "./utils/Player";
import "./styles/tailwind.css";

const initialStep = -1;
const size = 8;
function App() {
  const [step, setStep] = useState(initialStep);
  const [resetCount, setResetCount] = useState(8);
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

            refContainer.current = initialStep;
            setStep(initialStep);
          }}
        >
          Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={() => {
            setResetCount(resetCount + 1);
          }}
        >
          Clear
        </button>
      </div>
      <div className="p-4">
        <Board size={size} step={step} resetCount={resetCount} />
      </div>
    </div>
  );
}

export default App;
