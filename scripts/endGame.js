import { setCurrentQuestionIndex, setQuestionCounter } from "./questions/index.js";
import { resetPowers } from "./questions/powers.js";
import { returnToStartScreen } from "./ui.js";

export function endGame(message) {
  alert(message);
  returnToStartScreen();
  setCurrentQuestionIndex(0);
  setQuestionCounter(1);
  resetPowers();
}
