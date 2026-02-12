// Variáveis globais para controlar o estado do jogo
let contadorRodadas = 1; // Começa em 1, e incrementa antes de cada rodada
let jogoAtivo = true;

// Referências aos elementos HTML
const btnVerificar = document.querySelector('#btn-verify');
const btnReiniciar = document.querySelector('#btn-restart'); 
const contador = document.querySelector("#counter");
const resultado = document.querySelector('#feedback');
const mensagemFinal = document.querySelector('#info-display');
const inputEscolha = document.querySelector('#input-choice');
const msgEscolha = document.querySelector('#instruction');
const pEscolha = document.querySelector('#instruction-text');
const alerta = document.querySelector('#alert-text');
const sectionJogo = document.querySelector('section');

// Event Listeners

// Adiciona o evento de clique ao botão "Verificar"
btnVerificar.addEventListener('click', jogarRodada);

// Adiciona o evento de clique ao botão "Reiniciar"
btnReiniciar.addEventListener('click', reiniciarJogo);

// Adiciona o evento de teclado quando a tecla enter é pressionada
inputEscolha.addEventListener('keydown', verificarEnter);

// Funções do Jogo

 // Esta função é verifica se a tecla enter foi pressionada
function verificarEnter(event) {    
  if (event.key === 'Enter' && document.activeElement === inputEscolha) {
    event.preventDefault();
    jogarRodada();
  }
}

 // Esta função é chamada a cada clique no botão "Verificar" ou quando a tecla enter é pressionada 
function jogarRodada() {
    if (!jogoAtivo) return;

    let escolha = Number(inputEscolha.value);

    if (escolha < 1 || escolha > 6 || isNaN(escolha)) {
        resultado.textContent = "Número inválido! Escolha um número de 1 a 6.";
        inputEscolha.value = ""; 
        inputEscolha.focus();  
        return;
    }   

    const pisoQuebrado = Math.floor(Math.random() * 6) + 1;

    const cores = ["#ffff00", "#ffd700", "#ff8c00", "#ff4500", "#ff0000", "#e94560"];

    if (escolha !== pisoQuebrado) {
        // --- ACERTOU O PASSO ---
        contadorRodadas++;
        alerta.textContent = '';
        resultado.textContent = `Passou! O vidro frágil era o ${pisoQuebrado}.`;
        
        if (contadorRodadas <= 6) {
            contador.textContent = "";
            const corAtual = cores[contadorRodadas - 1]; 
            pEscolha.style.color = corAtual;
            
            ordinalAtual = obterOrdinal(contadorRodadas)
            
            pEscolha.textContent = `Você está na ${ordinalAtual} ponte. Escolha outro número de 1 a 6.`;
            inputEscolha.focus();
        } else {
            // --- VITÓRIA TOTAL ---
            resultado.textContent = "🏆 VOCÊ VENCEU! PARABÉNS!";
            sectionJogo.classList.add('win-effect'); // ADICIONA EFEITO DE VITÓRIA
            msgEscolha.style.display = 'none';
            finalizarJogo(true);
        }
    } else {
        // --- ERROU (VIDRO QUEBROU) ---
        sectionJogo.classList.add('shake-effect'); // ADICIONA EFEITO DE TREMOR
        alerta.textContent = '';
        resultado.textContent = `O VIDRO QUEBROU! O número era ${pisoQuebrado}.`;
        mensagemFinal.textContent = "Você caiu da ponte.";
        finalizarJogo(false);
        contador.style.display = 'none';
        msgEscolha.style.display = 'none';
    }

    inputEscolha.value = "";
}

/* Finaliza o jogo, desabilitando as interações e mostrando a mensagem final
 * @param {boolean} venceu Indica se o jogador venceu (true) ou perdeu (false) */
function finalizarJogo(venceu) {
    jogoAtivo = false; // Desativa o jogo
    inputEscolha.disabled = true; // Desabilita o campo de input
    btnVerificar.disabled = true; // Desabilita o botão de verificar
    btnReiniciar.style.display = 'block'; // Mostra o botão de reiniciar
    
    if (venceu) {
        mensagemFinal.textContent += " Clique em 'Reiniciar' para jogar novamente.";
    } else {
        mensagemFinal.textContent += " Clique em 'Reiniciar' para tentar de novo.";
    }
}

/* Reinicia o jogo, resetando as variáveis e elementos da UI. */

function reiniciarJogo() {
    contadorRodadas = 1;
    jogoAtivo = true;

    // REMOVE OS EFEITOS VISUAIS
    sectionJogo.classList.remove('shake-effect', 'win-effect');
    pEscolha.className = "";

    contador.textContent = 'Ponte número: 1';
    resultado.textContent = '';
    mensagemFinal.textContent = '';
    inputEscolha.value = '';
    

    msgEscolha.style.display = 'block';
    contador.style.display = 'block';
    pEscolha.style.display = 'block';
    inputEscolha.disabled = false;
    btnVerificar.disabled = false;
    btnReiniciar.style.display = 'none';
    inputEscolha.focus();
}

function obterOrdinal(contadorRodadas) {
    if (contadorRodadas === 1) return "primeira";   
    if (contadorRodadas === 2) return "segunda";
    if (contadorRodadas === 3) return "terceira";
    if (contadorRodadas === 4) return "quarta";
    if (contadorRodadas === 5) return "quinta";
    if (contadorRodadas === 6) return "última";    
    
    return contadorRodadas; 
}


