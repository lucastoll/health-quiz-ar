import { setCurrentQuestionIndex, setQuestionCounter } from "./questions/index.js";
import { resetPowers } from "./questions/powers.js";

export function endGame(message) {
  alert(message);
  setCurrentQuestionIndex(0);
  setQuestionCounter(1);
  resetPowers();
}
