import { currentQuestionIndex, quizQuestions, renderQuestion, setCurrentQuestionIndex } from "./index.js";

export let skipPowerCount = 3;
export let lessOptionsUsed = false;
export let helpUsed = true;

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
      const optionElement = document.querySelectorAll(".no-ar-mode__option")[item.index];
      optionElement.style.display = "none";
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

function showCorrectOption() {
  if (helpUsed) {
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

    help.style.opacity = 1;
    help.style.display = "block";

    setTimeout(() => {
      help.style.opacity = 0;
    }, 5000);

    setTimeout(() => {
      help.style.display = "none";
      helpActive = false;
    }, 6000);

    pathHelp.setAttribute("fill", "#d1d1d1");
    helpButton.classList.add("quiz-buttons__power--disabled");
  }
}

export function resetOptionsStyleDisplay() {
  const optionsElements = document.querySelectorAll(".no-ar-mode__option");
  optionsElements.forEach((option) => {
    option.style.display = "flex";
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
