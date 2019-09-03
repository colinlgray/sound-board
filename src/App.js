import React, { useState } from "react";
import Board from "./components/Board";
import useInterval from "./hooks/useInterval";
import "./styles/tailwind.css";
const size = 4;
function App() {
  const [step, setStep] = useState(0);
  const tick = () => {
    if (step + 1 < size) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };
  useInterval(tick, 400);
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Board size={size} step={-1} />
    </div>
  );
}

export default App;
