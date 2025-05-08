document.addEventListener("DOMContentLoaded", () => {
  const mensagemInput = document.getElementById("mensagem");
  const musicaInput = document.getElementById("musica");
  const imagemInput = document.getElementById("imagemInput");
  const gerarBtn = document.getElementById("gerarBtn");

  const mensagemPreview = document.getElementById("mensagemPreview");
  const musicaPreview = document.getElementById("musicaPreview");
  const imagemPreview = document.getElementById("imagemPreview");
  const qrCanvas = document.getElementById("qrcode");

  // Exibir conteúdo salvo no localStorage (se existir)
  const savedData = JSON.parse(localStorage.getItem("siteData"));
  if (savedData) {
    mensagemPreview.textContent = savedData.mensagem;
    musicaPreview.href = savedData.musica;
    musicaPreview.textContent = "Ouça nossa música ❤️";
    imagemPreview.src = savedData.imagem;
    imagemPreview.style.display = "block";
    document.getElementById("preview").style.display = "block";
  }

  gerarBtn.addEventListener("click", () => {
    const mensagem = mensagemInput.value.trim();
    const musica = musicaInput.value.trim();

    if (!mensagem || !musica) {
      alert("Preencha a mensagem e o link da música.");
      return;
    }

    const file = imagemInput.files[0];
    if (!file) {
      alert("Escolha uma imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const imagemBase64 = e.target.result;

      // Salvar no localStorage
      const siteData = {
        mensagem,
        musica,
        imagem: imagemBase64
      };
      localStorage.setItem("siteData", JSON.stringify(siteData));

      // Mostrar visualização
      mensagemPreview.textContent = mensagem;
      musicaPreview.href = musica;
      musicaPreview.textContent = "Ouça nossa música ❤️";
      imagemPreview.src = imagemBase64;
      imagemPreview.style.display = "block";

      document.getElementById("preview").style.display = "block";

      // Gerar QR Code com link simples
      const url = window.location.origin + window.location.pathname;
      QRCode.toCanvas(qrCanvas, url, error => {
        if (error) console.error(error);
        else console.log("QR Code gerado com sucesso!");
      });
    };
    reader.readAsDataURL(file);
  });
});
