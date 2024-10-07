let currentQuestionIndex = 0;
let questionCounter = 1;
let quizQuestions = [];

function loadQuestions() {
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

loadQuestions();

const noArModeQuestionText = document.querySelector(".no-ar-mode__question-text");
const questionText = document.querySelector("#questionText");
const questionCounterText = document.querySelector(".no-ar-mode__question-counter");
const optionA = document.querySelector("#optionA");
const optionB = document.querySelector("#optionB");
const optionC = document.querySelector("#optionC");
const optionD = document.querySelector("#optionD");

function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.setAttribute("value", currentQuestion.question);
  noArModeQuestionText.textContent = currentQuestion.question;
  questionCounterText.textContent = `${questionCounter}/10`;

  // Seleciona todos os elementos de opção
  const optionsElementsTexts = document.querySelectorAll(".no-ar-mode__option-text");
  const optionsElements = document.querySelectorAll(".no-ar-mode__option");
  console.log(optionsElements[0]);

  // Define o texto para cada opção de resposta
  optionsElementsTexts[0].textContent = currentQuestion.options[0].answer;
  optionsElementsTexts[1].textContent = currentQuestion.options[1].answer;
  optionsElementsTexts[2].textContent = currentQuestion.options[2].answer;
  optionsElementsTexts[3].textContent = currentQuestion.options[3].answer;

  // Adiciona event listeners para cada opção
  optionsElements[0].addEventListener("click", () => checkAnswer(0));
  optionsElements[1].addEventListener("click", () => checkAnswer(1));
  optionsElements[2].addEventListener("click", () => checkAnswer(2));
  optionsElements[3].addEventListener("click", () => checkAnswer(3));

  optionA.setAttribute("value", currentQuestion.options[0].answer);
  optionB.setAttribute("value", currentQuestion.options[1].answer);
  optionC.setAttribute("value", currentQuestion.options[2].answer);
  optionD.setAttribute("value", currentQuestion.options[3].answer);

  optionA.addEventListener("click", () => checkAnswer(0));
  optionB.addEventListener("click", () => checkAnswer(1));
  optionC.addEventListener("click", () => checkAnswer(2));
  optionD.addEventListener("click", () => checkAnswer(3));
}

function checkAnswer(optionIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedOption = currentQuestion.options[optionIndex];

  if (selectedOption.correct) {
    alert("Correto!");
    questionCounter++;
  } else {
    alert("Errado!");
    questionCounter = 1;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    alert("Fim do Quiz!");
    currentQuestionIndex = 0;
  }
}

function shuffleQuestions() {
  for (let i = quizQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
  }
}

document.querySelectorAll(".quiz-buttons__option").forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(index));
});
