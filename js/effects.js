function createParticles(x, y) {
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerHTML = '$';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.color = '#4CAF50';
        document.body.appendChild(p);
        
        // Анимация
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 50;
        p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.1,0.8,0.3,1)'
        });
        
        setTimeout(() => p.remove(), 1500);
    }
}