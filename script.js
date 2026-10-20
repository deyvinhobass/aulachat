const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#texto");
const mensagens = document.querySelector("#mensagens");


// Função nativa para gerar um som eletrônico (bip) sem precisar de arquivos externos
function tocarSom() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'triangle'; 
  oscillator.frequency.setValueAtTime(550, audioCtx.currentTime); // Tom do bip
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.15);
}




function adicionarMensagem(texto, tipo) {
  const paragrafo = document.createElement("p");
  paragrafo.textContent = texto;
  paragrafo.className = tipo;
  mensagens.appendChild(paragrafo);
  mensagens.scrollTop = mensagens.scrollHeight;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = campo.value.trim();

  if (texto.toLowerCase() === "oi") {
  adicionarMensagem("Bot: Olá! Tudo bem?", "bot");
} else {
  adicionarMensagem("Bot: Recebi sua mensagem!", "bot");
}

  adicionarMensagem("Você: " + texto, "usuario");
  tocarSom();
  adicionarMensagem("Bot: Recebi sua mensagem!", "bot");
  campo.value = "";
  campo.focus();
});