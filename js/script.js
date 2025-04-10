// Глобальный объект игры
const game = {
    bitcoin: 0,
    clickPower: 1,
    totalClicks: 0,
    upgrades: {
        gpu: { 
            name: "Видеокарта", 
            owned: 0, 
            baseCost: 1000, 
            cost: 1000, 
            power: 0.5,
            description: "+0.5 BTC/сек"
        },
        farm: { 
            name: "Майнинг-ферма", 
            owned: 0, 
            baseCost: 5000, 
            cost: 5000, 
            power: 2,
            description: "+2 BTC/сек"
        },
        asic: { 
            name: "ASIC-майнер", 
            owned: 0, 
            baseCost: 20000, 
            cost: 20000, 
            power: 5,
            description: "+5 BTC/сек"
        }
    },
    lastPlay: Date.now()
};

// Основные функции
function mineBitcoin() {
    game.bitcoin += game.clickPower;
    game.totalClicks++;
    updateUI();
    createParticles(event.clientX, event.clientY);
    saveGame();
}

function buyUpgrade(type) {
    const upgrade = game.upgrades[type];
    if (game.bitcoin >= upgrade.cost) {
        game.bitcoin -= upgrade.cost;
        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.owned));
        updateUI();
        saveGame();
        renderUpgrades();
    } else {
        showNotification("Недостаточно BTC!");
    }
}

// Система сохранения
function saveGame() {
    game.lastPlay = Date.now();
    localStorage.setItem('btcSave', JSON.stringify(game));
}

function loadGame() {
    const save = JSON.parse(localStorage.getItem('btcSave'));
    if (save) {
        Object.assign(game, save);
        updateUI();
        
        // Оффлайн-доход
        const offlineTime = (Date.now() - game.lastPlay) / 1000;
        if (offlineTime > 5) {
            const earned = calculateAutoIncome() * offlineTime * 0.3;
            game.bitcoin += earned;
            showNotification(`Оффлайн доход: +${earned.toFixed(1)} BTC`);
        }
    }
}

// Вспомогательные функции
function calculateAutoIncome() {
    let income = 0;
    for (const upgrade of Object.values(game.upgrades)) {
        income += upgrade.owned * upgrade.power;
    }
    return income;
}

function updateUI() {
    // Обновление счетчиков
    document.getElementById('bitcoin-counter').textContent = `${Math.floor(game.bitcoin)} BTC`;
    document.getElementById('power-display').textContent = `${game.clickPower} BTC/клик`;
    document.getElementById('auto-income').textContent = `${calculateAutoIncome().toFixed(1)} BTC/сек`;
    
    // Прогресс до престижа
    const progressPercent = Math.min((game.bitcoin / 1000000) * 100, 100);
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.getElementById('prestige-progress').textContent = `${progressPercent.toFixed(1)}%`;
}

function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '<h3>Улучшения</h3>';
    
    for (const [type, upgrade] of Object.entries(game.upgrades)) {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h4>${upgrade.name}</h4>
            <p>${upgrade.description}</p>
            <p>Куплено: ${upgrade.owned}</p>
            <p class="cost">Цена: ${Math.floor(upgrade.cost)} BTC</p>
        `;
        upgradeElement.onclick = () => buyUpgrade(type);
        container.appendChild(upgradeElement);
    }
}

// Автоматический доход
setInterval(() => {
    const autoIncome = calculateAutoIncome() / 10;
    if (autoIncome > 0) {
        game.bitcoin += autoIncome;
        updateUI();
    }
}, 100);

// Автосохранение
setInterval(saveGame, 30000);