import { useState } from "react";
import "./style.scss";

import GameMenu from "./GameMenu";
import CrossWord from "./CrossWord";
import SpeedQuiz from "./SpeedQuiz";

export default function Game() {
  const [step, setStep] = useState(0);
  return (
    <div className="game-container">
      {step === 0 ? (
        <GameMenu setStep={setStep} />
      ) : step === 1 ? (
        <CrossWord setStep={setStep} />
      ) : (
        <SpeedQuiz setStep={setStep} />
      )}
    </div>
  );
}
