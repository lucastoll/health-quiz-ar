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

startButton.addEventListener("click", () => {
  document.querySelectorAll(".quiz-buttons__container, .toggle-ar").forEach((element) => {
    element.style.display = "flex";
  });

  if (arModeActive) {
    document.querySelector(".ar-questions").style.display = "flex";
    document.querySelector(".no-ar-questions").style.display = "none";
  } else {
    document.querySelector(".no-ar-questions").style.display = "flex";
    document.querySelector(".ar-questions").style.display = "none";
  }

  loadQuestions();

  startScreen.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.play();
    }
  }, 1500);
});
