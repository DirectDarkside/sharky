class Level {
    enemies;
    backgroundObjects;
    items;
    gameOverObjects;
    level_end_x = 1440 - 140;

    constructor(enemies, backgroundObjects, items, gameOverObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
        this.gameOverObjects = gameOverObjects
    }
}