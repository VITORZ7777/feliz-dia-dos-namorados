// Gera QR Code com a biblioteca QRCode.js (inclua no HTML com <script src="https://cdn.jsdelivr.net/npm/qrcode@1/build/qrcode.min.js"></script>)
function gerarQRCode() {
  const mensagem = document.getElementById('mensagem').value;
  const linkMusica = document.getElementById('musica').value;

  const url = `https://felizdia.netlify.app/?msg=${encodeURIComponent(mensagem)}&musica=${encodeURIComponent(linkMusica)}`;
  
  QRCode.toCanvas(document.getElementById('qrcode'), url, function (error) {
    if (error) console.error(error);
    console.log('QR Code gerado com sucesso!');
  });

  document.getElementById('preview').style.display = 'block';
  document.getElementById('mensagemPreview').textContent = mensagem;
  document.getElementById('musicaPreview').href = linkMusica;
}

// Carrega imagem do usuário e exibe na prévia
function mostrarImagem(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById('imagemPreview').src = e.target.result;
    document.getElementById('imagemPreview').style.display = 'block';
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

