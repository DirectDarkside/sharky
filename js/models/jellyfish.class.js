class Jellyfish extends MovableObject {
    IMAGES_SWIMMING = [
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
    ];

    constructor() {
        super().loadImage('./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.height = 80;
        this.width = 80;
        this.x = 200 + Math.random() * 400;
        this.y = Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 175);
    }
}