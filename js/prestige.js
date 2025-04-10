let prestigeLevel = 0;

function resetForPrestige() {
    if (game.bitcoin >= 1000000) {
        prestigeLevel++;
        
        // Сохраняем только исследования
        const savedResearches = { ...game.researches };
        
        // Сброс прогресса
        game.bitcoin = 0;
        game.clickPower = 1 + (prestigeLevel * 0.2);
        
        // Сброс улучшений
        for (const upgrade of Object.values(game.upgrades)) {
            upgrade.owned = 0;
            upgrade.cost = upgrade.baseCost;
        }
        
        // Восстановление исследований
        game.researches = savedResearches;
        
        saveGame();
        showNotification(`Престиж ${prestigeLevel}! Бонус: +${prestigeLevel * 20}% к доходу`);
        renderUpgrades();
        updateUI();
    } else {
        showNotification(`Нужно 1,000,000 BTC для престижа!`);
    }
}