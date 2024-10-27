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
        <br/>
        <p>Neste jogo de perguntas e respostas, você terá a chance de testar seus conhecimentos e aprender dicas valiosas para cuidar da <b class="modal-highlight">saúde</b> e <b class="modal-highlight">bem-estar</b>.</p>
        <br/>
        <p>Cada pergunta traz informações importantes que podem ajudar a <b class="modal-highlight">prevenir doenças</b> e melhorar sua qualidade de vida. Aceite o desafio, jogue e descubra o quanto você sabe!</p>
        <br/>
        <p class="modal-highlight">1/3</p>
      `;
      break;
    case 2:
      modalText.innerHTML = `
        <h2>Você não está sozinho nessa jornada!</h2>
        <br/>
        <p>Durante o quiz, você terá <b class="modal-highlight">3 poderes especiais</b> para te ajudar a chegar mais longe:</p>
        <br/>
        <p><b class="modal-highlight">Pular a Pergunta:</b> Não sabe a resposta? Use este poder para passar para a próxima.</p>
        <br/>
        <p><b class="modal-highlight">Eliminar Alternativas:</b> Deixe o desafio um pouco mais fácil, removendo duas alternativas erradas.</p>
        <br/>
        <p><b class="modal-highlight">Ajuda do Zé Gotinha:</b> Quando estiver em dúvida, peça ajuda do Zé Gotinha para dar uma dica.</p>
        <br/>
        <p class="modal-highlight">2/3</p>
      `;
      break;
    case 3:
      modalText.innerHTML = `
        <h2>Realidade Aumentada</h2>
        <br/>
        <p>Este quiz utiliza a incrível tecnologia de <b class="modal-highlight">Realidade Aumentada!</b> Basta apontar a câmera do seu celular para a <b class="modal-highlight">imagem do seu cartão médico</b> e as perguntas aparecerão na tela.</p>
        <br/>
        <p>Caso a função não funcione corretamente, não se preocupe! Há um ícone de engrenagem no canto da tela onde você pode <b class="modal-highlight">desativar</b> a AR e continuar jogando normalmente. Divirta-se!</p>
        <br/>
        <p class="modal-highlight">3/3</p>
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