document.addEventListener("DOMContentLoaded", () => {
  const mensagemInput = document.getElementById("mensagem");
  const musicaInput = document.getElementById("musica");
  const imagemInput = document.getElementById("imagemInput");
  const gerarBtn = document.getElementById("gerarBtn");

  const mensagemPreview = document.getElementById("mensagemPreview");
  const musicaPreview = document.getElementById("musicaPreview");
  const imagemPreview = document.getElementById("imagemPreview");
  const qrCanvas = document.getElementById("qrcode");

  gerarBtn.addEventListener("click", () => {
    const mensagem = mensagemInput.value.trim();
    const musica = musicaInput.value.trim();

    if (!mensagem || !musica) {
      alert("https://open.spotify.com/intl-pt/track/1lg7G5zyf8apcquXJ7iPYR");
      return;
    }

    // Atualiza os previews
    mensagemPreview.textContent = mensagem;
    musicaPreview.href = musica;
    musicaPreview.textContent = "Ouça nossa música ❤️";

    // Gera QR Code com link contendo a mensagem e a música
    const qrData = `https://felizdia.netlify.app/?msg=${encodeURIComponent(mensagem)}&musica=${encodeURIComponent(musica)}`;
    QRCode.toCanvas(qrCanvas, qrData, error => {
      if (error) console.error(error);
      else console.log("QR Code gerado!");
    });

    document.getElementById("preview").style.display = "block";
  });

  imagemInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      imagemPreview.src = e.target.result;
      imagemPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
});
// Este arquivo será substituído com o conteúdo do canvas
