const quizButtons = document.querySelector(".quiz-buttons");
const arrow = document.querySelector(".quiz-buttons__arrow");

arrow.addEventListener("click", () => {
  quizButtons.classList.toggle("quiz-buttons--toggle");
  arrow.style.transform = `rotate(${quizButtons.classList.contains("quiz-buttons--toggle") ? 180 : 0}deg)`;
});
