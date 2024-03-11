let enemies = newEnemies();

let items = newItems();

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
        // new Pufferfish(400, 100),
        // new Pufferfish(400, 200),
        // new Pufferfish(400, 350),
        // new Jellyfish(),
    
        new Boss(-500, -500),
    ];
}