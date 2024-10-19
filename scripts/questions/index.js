import { endGame } from "../endGame.js";
import { showEndScreen } from "../ui.js";
import { updateCountdownTimer, timeoutCountdownId, setCountdownTimer } from "./countdown.js";
import { resetOptionsStyleDisplay } from "./powers.js";

export let currentQuestionIndex = 0;
export let questionCounter = 1;

export function setCurrentQuestionIndex(number) {
  currentQuestionIndex = number;
}

export function setQuestionCounter(number) {
  questionCounter = number;
}

export let quizQuestions = [];

export function loadQuestions() {
  fetch("../assets/json/questions.json")
    .then((response) => response.json())
    .then((data) => {
      quizQuestions = data;
      console.log("Questions loaded:", quizQuestions);
      shuffleQuestions();
      renderQuestion();
    })
    .catch((error) => console.error("Failed to load questions:", error));
}

const noArModeQuestionText = document.querySelector(".no-ar-mode__question-text");
const questionText = document.querySelector("#questionText");
const questionCounterText = document.querySelector(".no-ar-mode__question-counter");

export function renderQuestion() {
  if (timeoutCountdownId) {
    clearTimeout(timeoutCountdownId);
  }
  setCountdownTimer(40);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.setAttribute("value", currentQuestion.question);
  noArModeQuestionText.textContent = currentQuestion.question;
  questionCounterText.textContent = `${questionCounter}/10`;
  resetOptionsStyleDisplay();
  updateCountdownTimer();

  const optionsElementsTexts = document.querySelectorAll(".no-ar-mode__option-text");

  optionsElementsTexts[0].textContent = currentQuestion.options[0].answer;
  optionsElementsTexts[1].textContent = currentQuestion.options[1].answer;
  optionsElementsTexts[2].textContent = currentQuestion.options[2].answer;
  optionsElementsTexts[3].textContent = currentQuestion.options[3].answer;
}

function checkAnswer(optionIndex) {
  if (timeoutCountdownId) {
    clearTimeout(timeoutCountdownId);
  }
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedOption = currentQuestion.options[optionIndex];

  if (selectedOption.correct) {
    alert("Correto!");

    if (questionCounter === 10) {
      endGame("Fim do Quiz!", false);
      showEndScreen();
      return;
    }

    questionCounter++;
  } else {
    endGame("Errado!");
    return;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    endGame("Fim do Quiz!");
  }
}

function shuffleQuestions() {
  for (let i = quizQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
  }
}

const noArModeOptionsElements = document.querySelectorAll(".no-ar-mode__option");
const arModeOptions = document.querySelectorAll(".quiz-buttons__option");

noArModeOptionsElements.forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(index));
});

arModeOptions.forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(index));
});
