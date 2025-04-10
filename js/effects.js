// Партиклы
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

// Анимации
function animateUpgrade(element) {
    element.style.transform = 'scale(1.05)';
    element.style.boxShadow = '0 0 15px gold';
    setTimeout(() => {
        element.style.transform = '';
        element.style.boxShadow = '';
    }, 300);
}

// Уведомления
function showNotification(text) {
    const note = document.createElement('div');
    note.className = 'notification';
    note.textContent = text;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

// Достижения
function showAchievement(name) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <h3>${name}</h3>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}