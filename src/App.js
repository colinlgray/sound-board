import React, { useState } from "react";
import Board from "./components/Board";
import useInterval from "./hooks/useInterval";
import "./styles/tailwind.css";
const size = 4;
function App() {
  const [step, setStep] = useState(0);
  useInterval(() => {
    if (step + 1 < size) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  }, 400);
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="text-gray-700 p-2">Currently Loading Motivation...</div>
      <div>
        <Board size={size} step={step} />
      </div>
    </div>
  );
}

export default App;
