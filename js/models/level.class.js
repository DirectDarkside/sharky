class Level {
    enemies;
    backgroundObjects;
    level_end_x = 1440 - 140;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}