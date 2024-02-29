class Level {
    enemies;
    backgroundObjects;
    items;
    level_end_x = 1440 - 140;

    constructor(enemies, backgroundObjects, items) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }
}