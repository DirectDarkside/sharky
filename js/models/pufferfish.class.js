class Pufferfish extends MovableObject {

    energy = 100;
    collision = false;

    offset = {
        top: 0,
        left: 0,
        right: 5,
        bottom: 20
    }

    IMAGES_SWIMMING = [
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    IMAGES_DEAD = [
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png",
    ];
    IMAGES_ATTACK = [
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
        "./assets/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    ];
    

    constructor(x, y) {
        super().loadImage('./assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.height = 80;
        this.width = 80;
        this.x = 200 + Math.random() * 400;
        this.y = Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            // this.moveLeft();
        }, 0.250);
        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } if(this.collision) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 150);
    }

    kill() {
        this.energy = 0;
    }

    deadAnimation() {
        let interval = setInterval(() => {
            this.x -= 5;
            this.y += 5;
        }, 1000 / 60);
        setTimeout(() => {
            clearInterval(interval);
        }, 3000);
    }
   
}