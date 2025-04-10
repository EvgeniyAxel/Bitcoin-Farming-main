function resetPrestige() {
    if (money >= 1000000) {
        prestigeLevel++;
        
        // Бонус за престиж
        const bonus = 1 + (prestigeLevel * 0.2);
        
        // Сброс с сохранением некоторых улучшений
        money = 0;
        clickPower = 1 * bonus;
        passiveIncome = 0;
        
        // Сброс улучшений (кроме премиум)
        upgrades.click.forEach(u => {
            if (!u.premium) {
                u.owned = 0;
                u.cost = u.baseCost;
            }
        });
        
        upgrades.passive.forEach(u => {
            if (!u.premium) {
                u.owned = 0;
                u.cost = u.baseCost;
            }
        });
        
        updateUI();
        renderUpgrades();
        showNotification(`Престиж ${prestigeLevel}! Бонус: +${prestigeLevel * 20}% к доходу`);
    }
}