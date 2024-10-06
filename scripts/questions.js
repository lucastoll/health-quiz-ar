let currentQuestionIndex = 0;
let quizQuestions = [];

function loadQuestions() {
  fetch("../assets/json/questions.json")
    .then((response) => response.json())
    .then((data) => {
      quizQuestions = data;
      console.log("Questions loaded:", quizQuestions);
      renderQuestion();
    })
    .catch((error) => console.error("Failed to load questions:", error));
}

loadQuestions();

const questionText = document.querySelector("#questionText");
const optionA = document.querySelector("#optionA");
const optionB = document.querySelector("#optionB");
const optionC = document.querySelector("#optionC");
const optionD = document.querySelector("#optionD");

function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.setAttribute("value", currentQuestion.question);

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
  } else {
    alert("Errado!");
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    alert("Fim do Quiz!");
    currentQuestionIndex = 0;
  }
}

document.querySelector("#btnA").addEventListener("click", () => checkAnswer(0));
document.querySelector("#btnB").addEventListener("click", () => checkAnswer(1));
document.querySelector("#btnC").addEventListener("click", () => checkAnswer(2));
document.querySelector("#btnD").addEventListener("click", () => checkAnswer(3));
