import { arModeActive } from "./ARmode.js";
import { loadQuestions } from "./questions/index.js";

const quizButtons = document.querySelector(".quiz-buttons");
const arrow = document.querySelector(".quiz-buttons__arrow");
const startButton = document.querySelector(".start-button");
const startScreen = document.querySelector(".start-screen");

arrow.addEventListener("click", () => {
  quizButtons.classList.toggle("quiz-buttons--toggle");
  arrow.style.transform = `rotate(${quizButtons.classList.contains("quiz-buttons--toggle") ? 180 : 0}deg)`;
});

const arQuestions = document.querySelector(".ar-questions");
const noArQuestions = document.querySelector(".no-ar-questions");
const buttons = document.querySelectorAll(".quiz-buttons__container, .toggle-ar");

startButton.addEventListener("click", () => {
  buttons.forEach((element) => {
    element.style.display = "flex";
  });

  if (arModeActive) {
    arQuestions.style.display = "flex";
    noArQuestions.style.display = "none";
  } else {
    noArQuestions.style.display = "flex";
    arQuestions.style.display = "none";
  }

  loadQuestions();

  startScreen.style.display = "none";
});

const logo = document.querySelector(".logo");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (logo) {
      logo.play();
    }
  }, 1500);
});

const endScreen = document.querySelector(".end-screen");

export function returnToStartScreen() {
  startScreen.style.display = "flex";
  endScreen.style.display = "none";
  logo.currentTime = 0;
  logo.play();
  buttons.forEach((element) => {
    element.style.display = "none";
  });
  arQuestions.style.display = "none";
  noArQuestions.style.display = "none";
}

const returnButton = document.querySelector(".return-button");

returnButton.addEventListener("click", () => {
  returnToStartScreen();
});

export function showEndScreen() {
  endScreen.style.display = "flex";
  buttons.forEach((element) => {
    element.style.display = "none";
  });
  arQuestions.style.display = "none";
  noArQuestions.style.display = "none";
}
