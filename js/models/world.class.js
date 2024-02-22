class World {
    character = new Character();
    enemies = [
        new Pufferfish(400, 100),
        new Pufferfish(400, 200),
        new Pufferfish(400, 350),
    ];
    backgroundObjects = [
        // new BackgroundObject('./assets/img/3. Background/Dark/1.png', 0, 0, canvas.width / 2, canvas.height),
        // new BackgroundObject('./assets/img/3. Background/Dark/2.png', canvas.width / 2, 0, canvas.width / 2, canvas.height),
        new BackgroundObject('./assets/img/3. Background/Dark/1.png', 0, 0, canvas.width, canvas.height),
        new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 0, 0, canvas.width, canvas.height),
        // new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', canvas.width / 2, 0, canvas.width / 2, canvas.height),
        new BackgroundObject('./assets/img/3. Background/Barrier/2.png', 320, 330),

    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}