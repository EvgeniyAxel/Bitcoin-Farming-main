// Партиклы при клике
function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

// Анимация кнопки
function animateButton(btn) {
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

// Уведомления
function showNotification(text) {
  const note = document.createElement('div');
  note.className = 'notification';
  note.textContent = text;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}