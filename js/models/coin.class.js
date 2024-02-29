class Coin extends MovableObject {

    IMAGES = [
        "./assets/img/4. Marcadores/1. Coins/1.png",
        "./assets/img/4. Marcadores/1. Coins/2.png",
        "./assets/img/4. Marcadores/1. Coins/3.png",
        "./assets/img/4. Marcadores/1. Coins/4.png",
    ];

    constructor(x, y) {
        super().loadImage('./assets/img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES);
        this.height = 50;
        this.width = 50;
        this.x = 200 + Math.random() * 400;
        this.y = Math.random() * 400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 175);
    }
}