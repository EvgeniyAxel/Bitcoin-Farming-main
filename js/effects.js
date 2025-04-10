function createParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
        document.body.appendChild(p);
        
        // Анимация
        p.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0,0.2,0.8,1)'
        });
        
        setTimeout(() => p.remove(), 1000);
    }
}

function showNotification(text) {
    const note = document.createElement('div');
    note.className = 'notification';
    note.textContent = text;
    document.body.appendChild(note);
    
    note.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 300 });
    
    setTimeout(() => {
        note.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], { duration: 500, easing: 'ease-out' });
        setTimeout(() => note.remove(), 500);
    }, 2500);
}