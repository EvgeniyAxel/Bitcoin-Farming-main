// Инициализация переменных
let bitcoin = 0;
let clickPower = 1;

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
    if (offlineTime > 5000) { // 5+ сек
      const earned = Math.floor(offlineTime / 1000 * clickPower * 0.3);
      bitcoin += earned;
      showNotification(`Оффлайн доход: +${earned} BTC!`);
    }
  }
}

// Загрузка при старте
window.addEventListener('load', loadGame);
// Автосохранение каждые 30 сек
setInterval(saveGame, 30000);

// Функция клика
function mineBitcoin() {
  bitcoin += clickPower;
  updateUI();
  createParticles(event.clientX, event.clientY); // Партиклы
  animateButton(event.target); // Анимация кнопки
  saveGame();
}

// Обновление интерфейса
function updateUI() {
  document.getElementById('bitcoin-counter').textContent = bitcoin;
}