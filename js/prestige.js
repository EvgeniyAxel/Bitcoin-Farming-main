let prestigeLevel = 0;

function resetForPrestige() {
    if (game.bitcoin >= 1000000) {
        prestigeLevel++;
        
        // Сохраняем исследования и достижения
        const savedResearches = { ...game.researches };
        const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || [];
        
        // Сброс
        game.bitcoin = 0;
        game.clickPower = 1 + (prestigeLevel * 0.2);
        Object.values(game.upgrades).forEach(u => {
            u.owned = 0;
            u.cost = u.baseCost;
        });
        
        // Восстановление
        game.researches = savedResearches;
        localStorage.setItem('achievements', JSON.stringify(savedAchievements));
        
        saveGame();
        showNotification(`Престиж ${prestigeLevel}! Бонус: +${prestigeLevel * 20}% к доходу`);
        updateUI();
    }
}