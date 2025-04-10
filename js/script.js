// Инициализация переменных
let bitcoin = 0;
let clickPower = 1;

// Функция клика
function mineBitcoin() {
  bitcoin += clickPower;
  updateUI();
}

// Обновление интерфейса
function updateUI() {
  document.getElementById('bitcoin-counter').textContent = bitcoin;
}