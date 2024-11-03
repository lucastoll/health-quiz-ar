import { arModeActive } from "../ARmode.js";
import { currentQuestionIndex, quizQuestions, renderQuestion, setCurrentQuestionIndex } from "./index.js";

export let skipPowerCount = 3;
export let lessOptionsUsed = false;
export let helpUsed = false;

const skipButton = document.querySelector(".quiz-buttons__power--skip");
const skipButtonLabel = document.querySelector(".quiz-buttons__skip-span");
const pathSkips = document.querySelectorAll(".pathskip");

skipButton.addEventListener("click", skipQuestion);

function skipQuestion() {
  if (skipPowerCount > 0) {
    skipPowerCount--;
    if (skipPowerCount === 0) {
      skipButton.classList.add("quiz-buttons__power--disabled");
      pathSkips.forEach((path) => {
        path.setAttribute("fill", "#d1d1d1");
      });
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    skipButtonLabel.textContent = `Pular ${skipPowerCount}/3`;
    renderQuestion();
  } else {
    alert("Você não tem mais poderes de pular questão.");
  }
}

const eliminateButton = document.querySelector(".quiz-buttons__power--less-options");
const pathEliminate = document.querySelector(".pathEliminate");

eliminateButton.addEventListener("click", eliminateWrongOptions);

function eliminateWrongOptions() {
  if (!lessOptionsUsed) {
    lessOptionsUsed = true;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const incorrectOptions = currentQuestion.options.map((option, index) => ({ option, index })).filter((item) => !item.option.correct);

    const optionsToEliminate = incorrectOptions.slice(0, 2);

    optionsToEliminate.forEach((item) => {
      const noArOptionElement = document.querySelectorAll(".no-ar-mode__option")[item.index];
      const arOptionElement = document.querySelectorAll(".optionArEntity")[item.index];
      noArOptionElement.style.display = "none";
      arOptionElement.setAttribute("visible", "false");
    });

    pathEliminate.setAttribute("fill", "#d1d1d1");

    eliminateButton.classList.add("quiz-buttons__power--disabled");
  } else {
    alert("Você não tem mais poderes de eliminar alternativas.");
  }
}

const helpButton = document.querySelector(".quiz-buttons__power--help");
const pathHelp = document.querySelector(".pathHelp");
const help = document.querySelector(".help");
const correctAnswerSpan = document.querySelector(".help__correct-answer");
export let helpActive = false;

helpButton.addEventListener("click", showCorrectOption);

const arHelpAnimation = document.querySelector(".ar-help-animation");
const arHelpAnswer = document.querySelector(".ar-help-answer");
const arQuestions = document.querySelectorAll(".ar-questions-element");
const buttons = document.querySelectorAll(".quiz-buttons__container");
const toggleAr = document.querySelector(".toggle-ar");

function showCorrectOption() {
  if (!helpUsed) {
    helpUsed = true;
    helpActive = true;

    const indexes = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correctOptionIndex = currentQuestion.options.findIndex((option) => option.correct);
    correctAnswerSpan.textContent = indexes[correctOptionIndex];

    if (!arModeActive) {
      help.style.display = "block";
      help.style.opacity = 1;

      setTimeout(() => {
        help.style.opacity = 0;
      }, 5000);

      setTimeout(() => {
        help.style.display = "none";
        helpActive = false;
      }, 6000);
    } else {
      [arHelpAnimation, arHelpAnswer].forEach((element) => {
        element.setAttribute("visible", true);
      });

      console.log(arHelpAnswer);

      arHelpAnswer.setAttribute("value", indexes[correctOptionIndex]);

      arQuestions.forEach((element) => {
        element.setAttribute("visible", false);
      });

      buttons.forEach((element) => {
        element.style.display = "none";
      });

      toggleAr.style.display = "none";

      setTimeout(() => {
        [arHelpAnimation, arHelpAnswer].forEach((element) => {
          element.setAttribute("visible", false);
        });

        arQuestions.forEach((element) => {
          element.setAttribute("visible", true);
        });

        buttons.forEach((element) => {
          element.style.display = "flex";
        });

        toggleAr.style.display = "flex";

        helpActive = false;
      }, 5000);
    }

    pathHelp.setAttribute("fill", "#d1d1d1");
    helpButton.classList.add("quiz-buttons__power--disabled");
  }
}

export function resetOptionsStyleDisplay() {
  const noArOptionsElements = document.querySelectorAll(".no-ar-mode__option");
  const arOptionsElements = document.querySelectorAll(".optionArEntity");
  noArOptionsElements.forEach((option) => {
    option.style.display = "flex";
  });

  arOptionsElements.forEach((option) => {
    option.setAttribute("visible", "true");
  });
}

export function resetPowers() {
  skipPowerCount = 3;
  lessOptionsUsed = false;
  helpUsed = false;
  helpActive = false;
  skipButton.classList.remove("quiz-buttons__power--disabled");
  eliminateButton.classList.remove("quiz-buttons__power--disabled");
  helpButton.classList.remove("quiz-buttons__power--disabled");
  pathSkips.forEach((path) => {
    path.setAttribute("fill", "#175696");
  });
  pathEliminate.setAttribute("fill", "#175696");
  pathHelp.setAttribute("fill", "#175696");
}
