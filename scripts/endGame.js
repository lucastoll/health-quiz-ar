import { currentQuestionIndex, questionCounter, renderQuestion } from "./questions/index.js";

export function endGame(message) {
  alert(message);
  currentQuestionIndex = 0;
  questionCounter = 1;
  renderQuestion();
}