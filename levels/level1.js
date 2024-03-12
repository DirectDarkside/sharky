let enemies;
let items;

const backgroundObjects = [
    new BackgroundObject('./assets/img/3. Background/Dark/2.png', -720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', -720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Dark/1.png', 0, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 0, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Barrier/2.png', 320, 330),
    new BackgroundObject('./assets/img/3. Background/Dark/2.png', 720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Dark/1.png', 1440, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 1440, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Dark/2.png', 2160, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 2160, 0, canvas.width, canvas.height),
];
const gameWinObjects = [
    new BackgroundObject('./assets/img/6.Botones/Try again/Mesa de trabajo 1.png', 0, 0, canvas.width, canvas.height)
];
const gameOverObjects = [
    new BackgroundObject('./assets/img/6.Botones/Tittles/Game Over/Recurso 9.png', 250, 240, 240, 80)
];
let audioElements = [];
let level1 = new Level(enemies, backgroundObjects, items, gameWinObjects, gameOverObjects, audioElements);

/**
 * This feature resets the level by creating new enemies and items as well as resetting the audio elements. The level is then reinitialized with the updated elements.
 */
function resetLevel() {
    enemies = newEnemies();
    items = newItems();
    audioElements = [];
    level1 = new Level(enemies, backgroundObjects, items, gameWinObjects, gameOverObjects, audioElements);
}

function newItems() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),

        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
    ];
}

function newEnemies() {
    return [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
    
        new Boss(-500, -500),
    ];
}