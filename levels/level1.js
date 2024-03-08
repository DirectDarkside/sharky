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
];

const gameOverObjects = [
    new BackgroundObject('./assets/img/6.Botones/Try again/Mesa de trabajo 1.png', 0, 0, canvas.width, canvas.height)
];

let level1 = new Level(enemies, backgroundObjects, items, gameOverObjects);

function resetLevel() {
    enemies = newEnemies();
    items = newItems();

    level1 = new Level(enemies, backgroundObjects, items, gameOverObjects);

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
    
        new Boss(-500, -100),
    ];
}