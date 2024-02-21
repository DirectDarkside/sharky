class World {
    character = new Character();
    background = new Background();
    enemies = [
        new Pufferfish(400, 100),
        new Pufferfish(400, 200),
        new Pufferfish(400, 350),
    ];
    coins = [
        new Coin(),
        new Coin(),
        new Coin(),
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
        this.ctx.drawImage(this.background.img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.coins.forEach(coin => {
            this.ctx.drawImage(coin.img, coin.x, coin.y, coin.width, coin.height);
        });
        this.enemies.forEach(enemie => {
            this.ctx.drawImage(enemie.img, enemie.x, enemie.y, enemie.width, enemie.height);
        });

        //Draw() wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
}