class Level {
    enemies;
    backgroundObjects;
    items;
    gameWinObjects;
    gameOverObjects;
    audioElements;
    level_end_x = 1440 - 140;

    constructor(enemies, backgroundObjects, items, gameWinObjects, gameOverObjects, audioElements) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
        this.gameWinObjects = gameWinObjects;
        this.gameOverObjects = gameOverObjects;
        this.audioElements = audioElements;
    }
}