const toggleArButton = document.querySelector(".toggle-ar");
const arScene = document.querySelector(".ar-mode");
const noArMode = document.querySelector(".no-ar-mode");

let arModeActive = false;

toggleArButton.addEventListener("click", () => toggleArMode());

function toggleArMode() {
  if (arModeActive) {
    document.querySelector("video").style.display = "block";
    arScene.pause();
    arScene.removeAttribute("arjs");
    noArMode.style.display = "block";
    arScene.style.display = "none";
  } else {
    document.querySelector("video").style.display = "none";
    arScene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");
    arScene.style.display = "block";
    arScene.play();
  }
  arModeActive = !arModeActive;
}
