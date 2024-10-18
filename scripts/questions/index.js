import { endGame } from "../endGame.js";
import { updateCountdownTimer, timeoutCountdownId, setCountdownTimer } from "./countdown.js";

export let currentQuestionIndex = 0;
export let questionCounter = 1;

export function setCurrentQuestionIndex(number) {
  currentQuestionIndex = number;
}

export function setQuestionCounter(number) {
  questionCounter = number;
}

let quizQuestions = [];

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
  updateCountdownTimer();

  // Seleciona todos os elementos de opção
  const optionsElementsTexts = document.querySelectorAll(".no-ar-mode__option-text");

  // Define o texto para cada opção de resposta
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
    questionCounter++;
  } else {
    endGame("Errado!");
    return
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