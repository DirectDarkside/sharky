const enemies = [
    new Pufferfish(400, 100),
    new Pufferfish(400, 200),
    new Pufferfish(400, 350),
    new Jellyfish(),

    new Boss(-500, -100),
];

const items = [
    // new Coin(),
    // new Coin(),
    // new Coin(),
    // new Coin(),
    // new Coin(),

    // new Poison(),
    // new Poison(),
    // new Poison(),
    // new Poison(),
    // new Poison(),
];

const backgroundObjects = [
    new BackgroundObject('./assets/img/3. Background/Dark/2.png', -720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', -720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Dark/1.png', 0, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 0, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Barrier/2.png', 320, 330),
    new BackgroundObject('./assets/img/3. Background/Dark/2.png', 720, 0, canvas.width, canvas.height),
    new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 720, 0, canvas.width, canvas.height),

];

const level1 = new Level(enemies, backgroundObjects, items);