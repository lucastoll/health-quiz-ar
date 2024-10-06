const toggleArButton = document.querySelector(".toggle-ar");
const arScene = document.querySelector(".ar-mode");
const noArMode = document.querySelector(".no-ar-mode");

export let arModeActive = false;

toggleArButton.addEventListener("click", () => toggleArMode());

function toggleArMode() {
  if (arModeActive) {
    deactivateArMode();
  } else {
    activateArMode();
  }
  arModeActive = !arModeActive;
}

function deactivateArMode() {
  console.log("Deactivating AR mode");
  document.querySelector("video").style.display = "none";
  arScene.pause();
  arScene.removeAttribute("arjs");
  noArMode.style.display = "block";
  arScene.style.display = "none";
  document.body.classList.remove("ar-mode");
  document.body.classList.add("no-ar-mode");
}

function activateArMode() {
  document.querySelector("video").style.display = "block";
  arScene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");
  arScene.style.display = "block";
  arScene.play();
  document.body.classList.add("ar-mode");
  document.body.classList.remove("no-ar-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  const interval = setInterval(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      deactivateArMode();
      clearInterval(interval);
    }
  }, 100);
});
