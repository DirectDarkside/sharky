class Coin extends MovableObject {

    y = 200;
    x = 250 + Math.random() * 400;
    width = 50;
    height = 50;

    constructor() {
        super().loadImage('assets/img/4. Marcadores/1. Coins/1.png');
    }
}