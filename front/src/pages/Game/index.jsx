import { useState } from "react";
import "./style.scss";

import GameMenu from "./GameMenu";

export default function Game() {
  const [step, setStep] = useState(0);
  return (
    <div className="game-container">
      {}
      <GameMenu />
    </div>
  );
}
