import { endGame } from "../endGame.js";

export let countdownTimer = 40;
export let timeoutCountdownId = null;

const counter = document.querySelector(".no-ar-mode__counter");

export function updateCountdownTimer() {
  countdownTimer--;
  counter.textContent = `${countdownTimer}`;
  if (countdownTimer <= 0) {
    endGame("Tempo esgotado!");
  } else {
    timeoutCountdownId = setTimeout(updateCountdownTimer, 1000);
  }
}

export function setCountdownTimer(value) {
  countdownTimer = value;
}
