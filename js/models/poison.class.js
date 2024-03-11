class Poison extends MovableObject {

    IMAGES = [
        "./assets/img/4. Marcadores/Posión/Animada/1.png",
        "./assets/img/4. Marcadores/Posión/Animada/2.png",
        "./assets/img/4. Marcadores/Posión/Animada/3.png",
        "./assets/img/4. Marcadores/Posión/Animada/4.png",
        "./assets/img/4. Marcadores/Posión/Animada/5.png",
        "./assets/img/4. Marcadores/Posión/Animada/6.png",
        "./assets/img/4. Marcadores/Posión/Animada/7.png",
        "./assets/img/4. Marcadores/Posión/Animada/8.png",
    ];
    takeSound = new Audio('./assets/audio/take_item.mp3');

    constructor(x, y) {
        super().loadImage('./assets/img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES);
        this.height = 70;
        this.width = 50;
        this.x = 200 + Math.random() * 400;
        this.y = Math.random() * 400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}