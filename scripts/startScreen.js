let modalStep = 1;

function startQuiz() {
  console.log("Iniciando o quiz...");
}

document.querySelector(".info-button").onclick = function () {
  howItWorks();
};

function howItWorks() {
  if (!isModalOpen()) {
    showModal();
    resetModal();
  }
}

function isModalOpen() {
  const modal = document.getElementById("infoModal");
  return modal.style.display === "flex";
}

function showModal() {
  const modal = document.getElementById("infoModal");
  modal.style.display = "flex";
  updateModalText();
}

document.querySelector(".close").onclick = function () {
  closeModal();
};

function closeModal() {
  document.getElementById("infoModal").style.display = "none";
  resetModal();
}

function updateModalText() {
  const modalText = document.getElementById("modal-text");
  switch (modalStep) {
    case 1:
      modalText.innerHTML = `
        <h2>Bem-vindo ao Quiz do Zé Gotinha!</h2>
        <p>Neste jogo de perguntas e respostas, você terá a chance de testar seus conhecimentos e aprender dicas valiosas para cuidar da <b>saúde</b> e <b>bem-estar</b>.</p>
        <p>Cada pergunta traz informações importantes que podem ajudar a <b>prevenir doenças</b> e melhorar sua qualidade de vida. Aceite o desafio, jogue e descubra o quanto você sabe!</p>
        <p>1/3</p>
      `;
      break;
    case 2:
      modalText.innerHTML = `
        <h2>Você não está sozinho nessa jornada!</h2>
        <p>Durante o quiz, você terá <b>3 poderes especiais</b> para te ajudar a chegar mais longe:</p>
        <p><b>Pular a Pergunta:</b> Não sabe a resposta? Use este poder para passar para a próxima.</p>
        <p><b>Eliminar Alternativas:</b> Deixe o desafio um pouco mais fácil, removendo duas alternativas erradas.</p>
        <p><b>Ajuda do Zé Gotinha:</b> Quando estiver em dúvida, peça ajuda do Zé Gotinha para dar uma dica.</p>
        <p>2/3</p>
      `;
      break;
    case 3:
      modalText.innerHTML = `
        <h2>Realidade Aumentada</h2>
        <p>Este quiz utiliza a incrível tecnologia de <b>Realidade Aumentada!</b> Basta apontar a câmera do seu celular para a imagem do seu cartão médico e as perguntas aparecerão na tela.</p>
        <p>Caso a função não funcione corretamente, não se preocupe! Há um ícone de engrenagem no canto da tela onde você pode desativar a AR e continuar jogando normalmente. Divirta-se!</p>
        <p>3/3</p>
      `;
      break;
    default:
      closeModal();
  }
}

document.querySelector(".next-button").onclick = function () {
  nextModal();
};

function nextModal() {
  modalStep++;
  if (modalStep > 3) {
    closeModal();
  } else {
    updateModalText();
  }
}

function resetModal() {
  modalStep = 1;
  updateModalText();
}

window.onclick = function (event) {
  const modal = document.getElementById("infoModal");
  if (event.target == modal) {
    closeModal();
  }
};
