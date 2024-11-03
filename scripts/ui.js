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

const arQuestions = document.querySelectorAll(".ar-questions-element");
const noArQuestions = document.querySelector(".no-ar-questions");
const buttons = document.querySelectorAll(".quiz-buttons__container, .toggle-ar");

startButton.addEventListener("click", () => {
  buttons.forEach((element) => {
    element.style.display = "flex";
  });

  arQuestions.forEach((element) => {
    element.setAttribute("visible", true);
  });

  if (arModeActive) {
    noArQuestions.style.display = "none";
    arCanvas.style.display = "block";
  } else {
    noArQuestions.style.display = "flex";
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

const returnButton = document.querySelector(".return-button");
const arReturnButton = document.querySelector(".ar-return-button");

const arEndScreenElements = document.querySelectorAll(".ar-end-screen");
const arCanvas = document.querySelector(".ar-questions");

export function returnToStartScreen() {
  startScreen.style.display = "flex";
  endScreen.style.display = "none";
  logo.currentTime = 0;
  logo.play();
  buttons.forEach((element) => {
    element.style.display = "none";
  });
  noArQuestions.style.display = "none";
  arQuestions.forEach((element) => {
    element.setAttribute("visible", false);
  });
  arEndScreenElements.forEach((element) => {
    element.setAttribute("visible", false);
  });
  arReturnButton.style.display = "none";
  arCanvas.style.display = "none";
}

returnButton.addEventListener("click", () => {
  returnToStartScreen();
});

arReturnButton.addEventListener("click", () => {
  returnToStartScreen();
});

export function showEndScreen() {
  arQuestions.forEach((element) => {
    element.setAttribute("visible", false);
  });
  buttons.forEach((element) => {
    element.style.display = "none";
  });
  if (!arModeActive) {
    endScreen.style.display = "flex";
    buttons.forEach((element) => {
      element.style.display = "none";
    });
    noArQuestions.style.display = "none";
  } else {
    arReturnButton.style.display = "block";
    noArQuestions.style.display = "none";
    arEndScreenElements.forEach((element) => {
      element.setAttribute("visible", true);
    });
  }
}
