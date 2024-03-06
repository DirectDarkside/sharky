class Jellyfish extends MovableObject {

    energy = 100;

    IMAGES_SWIMMING = [
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
        "./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
    ];
    IMAGES_DEAD = [
        "./assets/img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
        "./assets/img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
        "./assets/img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
        "./assets/img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
    ];

    constructor() {
        super().loadImage('./assets/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.height = 80;
        this.width = 80;
        this.x = 200 + Math.random() * 400;
        this.y = Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
            
        }, 175);
    }

    kill() {
        this.energy = 0;
        const interval = setInterval(() => {
            this.y -= 5;
        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(interval);
        }, 4000);
    }
}