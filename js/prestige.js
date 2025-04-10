// Проверка переменных
if (typeof bitcoin === 'undefined') {
  var bitcoin = 0;
}
if (typeof clickPower === 'undefined') {
  var clickPower = 1;
}

let prestigeLevel = 0;
let prestigePoints = 0;

function resetForPrestige() {
  if (bitcoin >= 1000000) {
    prestigePoints += Math.floor(bitcoin / 1000000);
    prestigeLevel++;
    bitcoin = 0;
    clickPower = 1 + prestigeLevel * 0.2;
    saveGame();
    showNotification(`Престиж ${prestigeLevel}! Бонус: +${prestigeLevel * 20}%`);
  }
}