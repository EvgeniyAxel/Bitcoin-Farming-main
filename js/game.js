// Основные переменные
let money = 0;
let clickPower = 1;
let passiveIncome = 0;
let prestigeLevel = 0;

// Все улучшения
const upgrades = {
    // Улучшения клика
    click: [
        {
            id: "gloves",
            name: "Перчатки",
            desc: "Удобные перчатки увеличивают продуктивность",
            cost: 100,
            power: 1,
            owned: 0
        },
        {
            id: "energy-drink",
            name: "Энергетик",
            desc: "+2$ за клик (эффект длится 1 час)",
            cost: 500,
            power: 2,
            owned: 0
        },
        // Другие улучшения...
    ],
    
    // Пассивный доход
    passive: [
        {
            id: "intern",
            name: "Стажёр",
            desc: "Наймите стажёра для пассивного заработка",
            cost: 1000,
            income: 0.5,
            owned: 0
        },
        {
            id: "stock-market",
            name: "Фондовый рынок",
            desc: "Инвестиции приносят стабильный доход",
            cost: 10000,
            income: 5,
            owned: 0
        },
        // Другие улучшения...
    ]

    // В массив upgrades.click:
{
    id: "gold-card",
    name: "Золотая карта",
    desc: "VIP-карта увеличивает доход на 5$ за клик",
    cost: 5000,
    power: 5,
    premium: true
},

// В массив upgrades.passive:
{
    id: "real-estate",
    name: "Недвижимость",
    desc: "Арендная плата приносит стабильный доход",
    cost: 50000,
    income: 20,
    owned: 0
}
};

// Основные функции
function clickDollar() {
    money += clickPower;
    updateUI();
    createParticles(event.clientX, event.clientY);
}

function buyUpgrade(type, id) {
    const upgrade = upgrades[type].find(u => u.id === id);
    
    if (money >= upgrade.cost) {
        money -= upgrade.cost;
        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.cost * 1.15);
        
        if (type === 'click') {
            clickPower += upgrade.power;
        } else {
            passiveIncome += upgrade.income;
        }
        
        updateUI();
        renderUpgrades();
    }
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('money-counter').textContent = `$${formatNumber(money)}`;
    document.getElementById('click-power').textContent = `$${clickPower}`;
    document.getElementById('passive-income').textContent = `$${passiveIncome.toFixed(1)}/сек`;
    
    // Прогресс-бар
    const progress = Math.min((money / 1000000) * 100, 100);
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('prestige-progress').textContent = `${progress.toFixed(1)}%`;
}

// Форматирование чисел
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Вкладки
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
    document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    renderUpgrades();
    setInterval(() => {
        money += passiveIncome / 10;
        updateUI();
    }, 100);
});