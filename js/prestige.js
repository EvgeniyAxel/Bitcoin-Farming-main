let prestigeLevel = 0;

function resetForPrestige() {
    if (game.bitcoin >= 1000000) {
        prestigeLevel++;
        
        // Сохраняем улучшения
        const upgradesBackup = { ...game.upgrades };
        
        // Сброс
        game.bitcoin = 0;
        game.clickPower = 1 + (prestigeLevel * 0.2);
        
        // Восстановление улучшений
        game.upgrades = upgradesBackup;
        
        saveGame();
        showNotification(`Престиж ${prestigeLevel}! Бонус: +${prestigeLevel * 20}% к доходу`);
        updateUI();
    }
}