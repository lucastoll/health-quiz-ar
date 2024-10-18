import { setCurrentQuestionIndex, setQuestionCounter } from "./questions/index.js";

export function endGame(message) {
  alert(message);
  setCurrentQuestionIndex(0);
  setQuestionCounter(1);
}