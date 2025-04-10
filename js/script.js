// ===== Переменные ===== //
let bitcoin = 0;
let clickPower = 1;

// ===== Автосохранение ===== //
function saveGame() {
  localStorage.setItem('btcSave', JSON.stringify({
    bitcoin: bitcoin,
    clickPower: clickPower,
    lastPlay: Date.now()
  }));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem('btcSave'));
  if (save) {
    bitcoin = save.bitcoin;
    clickPower = save.clickPower || 1;
    updateUI();
    
    // Оффлайн-доход
    const offlineTime = Date.now() - (save.lastPlay || 0);
    if (offlineTime > 5000) {
      const earned = Math.floor(offlineTime / 1000 * clickPower * 0.3);
      bitcoin += earned;
      showNotification(`Оффлайн доход: +${earned} BTC!`);
    }
  }
}

// ===== Основные функции ===== //
function mineBitcoin() {
  bitcoin += clickPower;
  updateUI();
  createParticles(event.clientX, event.clientY);
  animateButton(event.target);
  saveGame();
}

function updateUI() {
  document.getElementById('bitcoin-counter').textContent = bitcoin;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  loadGame();
  setInterval(saveGame, 30000);
});