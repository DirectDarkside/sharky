class Pufferfish extends MovableObject {

    IMAGES_SWIMMING = [
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    

    constructor(x, y) {
        super().loadImage('./assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
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
            this.moveLeft();
        }, 0.250);
        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 150);
    }
   
}