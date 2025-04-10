// ===== Глобальные переменные =====
const game = {
    bitcoin: 0,
    clickPower: 1,
    totalClicks: 0,
    upgrades: {
        gpu: { owned: 0, baseCost: 1000, cost: 1000, power: 0.5 },
        farm: { owned: 0, baseCost: 5000, cost: 5000, power: 2 },
        asic: { owned: 0, baseCost: 15000, cost: 15000, power: 10 }
    },
    researches: {
        doubleClick: { bought: false, cost: 20000 }
    },
    lastDaily: null,
    dailyStreak: 0
};

// ===== Система сохранения =====
function saveGame() {
    localStorage.setItem('btcSave', JSON.stringify({
        ...game,
        lastPlay: Date.now()
    }));
}

function loadGame() {
    const save = JSON.parse(localStorage.getItem('btcSave'));
    if (save) {
        Object.assign(game, save);
        updateUI();
        
        // Оффлайн-доход
        const offlineSeconds = Math.floor((Date.now() - (save.lastPlay || 0)) / 1000);
        if (offlineSeconds > 5) {
            const earned = calculateOfflineIncome(offlineSeconds);
            game.bitcoin += earned;
            showNotification(`Оффлайн доход: +${earned} BTC за ${Math.floor(offlineSeconds)} сек`);
        }
    }
    checkDailyReward();
}

// ===== Основные функции =====
function mineBitcoin() {
    game.totalClicks++;
    
    // Основной доход
    let earned = game.clickPower;
    
    // Критический удар (10% шанс)
    if (Math.random() < 0.1) {
        earned *= 3;
        showNotification("Критический удар! x3 BTC");
    }
    
    game.bitcoin += earned;
    updateUI();
    createParticles(event.clientX, event.clientY);
    saveGame();
    checkAchievements();
}

function updateUI() {
    // Обновляем цифры
    document.getElementById('bitcoin-counter').textContent = `${game.bitcoin} BTC`;
    document.getElementById('power-display').textContent = `${game.clickPower} BTC/клик`;
    
    // Прогресс-бар
    const progressPercent = Math.min((game.bitcoin / 1000000) * 100, 100);
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.getElementById('prestige-progress').textContent = `${progressPercent.toFixed(1)}%`;
    
    // Автодоход
    const autoIncome = calculateAutoIncome();
    document.getElementById('auto-income').textContent = `${autoIncome} BTC/сек`;
}

// ===== Новые системы =====
function calculateAutoIncome() {
    return Object.values(game.upgrades).reduce((sum, upgrade) => {
        return sum + (upgrade.owned * upgrade.power);
    }, 0);
}

function calculateOfflineIncome(seconds) {
    return Math.floor(seconds * calculateAutoIncome());
}

function buyUpgrade(type) {
    const upgrade = game.upgrades[type];
    if (game.bitcoin >= upgrade.cost) {
        game.bitcoin -= upgrade.cost;
        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        updateUI();
        saveGame();
        animateUpgrade(document.getElementById(`${type}-cost`).parentElement);
    }
}

function checkDailyReward() {
    const today = new Date().toDateString();
    if (game.lastDaily !== today) {
        game.dailyStreak++;
        const reward = 100 * game.dailyStreak;
        game.bitcoin += reward;
        game.lastDaily = today;
        showNotification(`Ежедневная награда: +${reward} BTC (серия ${game.dailyStreak})`);
        saveGame();
    }
}

// ===== Инициализация =====
document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    setInterval(() => {
        game.bitcoin += calculateAutoIncome() / 10;
        updateUI();
        saveGame();
    }, 100);
    setInterval(saveGame, 30000);
});