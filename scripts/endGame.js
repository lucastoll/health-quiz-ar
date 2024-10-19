import { setCurrentQuestionIndex, setQuestionCounter } from "./questions/index.js";
import { resetPowers } from "./questions/powers.js";
import { returnToStartScreen } from "./ui.js";

export function endGame(message, returnToStart = true) {
  alert(message);
  setCurrentQuestionIndex(0);
  if (returnToStart) {
    returnToStartScreen();
  }
  setQuestionCounter(1);
  resetPowers();
}
