const raceBtn = document.getElementById('race-btn');
const resetBtn = document.getElementById('reset-btn');
const mario = document.getElementById('mario');
const luigi = document.getElementById('luigi');
const modal = document.getElementById('result-modal');
const winnerText = document.getElementById('winner-text');
const closeBtn = document.getElementById('close-btn');

let marioPos = 10;
let luigiPos = 10;
let raceInterval;
let isRacing = false;

function startRace() {
    if (isRacing) return; // Evita clicar várias vezes enquanto corre
    isRacing = true;
    raceBtn.disabled = true;

    // Obtém a largura da pista para definir o ponto de chegada dinamicamente
    const trackWidth = document.querySelector('.track-container').offsetWidth;
    const finishLinePos = trackWidth - 120; // Ajuste para o tamanho do kart

    raceInterval = setInterval(() => {
        // Gera um avanço aleatório para cada um (entre 1 e 15 pixels)
        marioPos += Math.floor(Math.random() * 15) + 1;
        luigiPos += Math.floor(Math.random() * 15) + 1;

        // Atualiza a posição visual no CSS
        mario.style.left = marioPos + 'px';
        luigi.style.left = luigiPos + 'px';

        // Verifica se alguém ganhou
        if (marioPos >= finishLinePos || luigiPos >= finishLinePos) {
            clearInterval(raceInterval);
            declareWinner(marioPos, luigiPos);
        }
    }, 50); // Roda a cada 50 milissegundos
}

function declareWinner(marioFinal, luigiFinal) {
    if (marioFinal > luigiFinal) {
        winnerText.textContent = "🔴 MARIO VENCEU!";
        winnerText.style.color = "#e52521";
    } else if (luigiFinal > marioFinal) {
        winnerText.textContent = "🟢 LUIGI VENCEU!";
        winnerText.style.color = "#00b22d";
    } else {
        winnerText.textContent = "EMPATE!";
        winnerText.style.color = "#fff";
    }
    
    setTimeout(() => {
        modal.classList.remove('hidden');
    }, 500);
}

function resetRace() {
    marioPos = 10;
    luigiPos = 10;
    mario.style.left = marioPos + 'px';
    luigi.style.left = luigiPos + 'px';
    modal.classList.add('hidden');
    isRacing = false;
    raceBtn.disabled = false;
    clearInterval(raceInterval);
}

// Event Listeners (Cliques dos botões)
raceBtn.addEventListener('click', startRace);
resetBtn.addEventListener('click', resetRace);
closeBtn.addEventListener('click', resetRace);
