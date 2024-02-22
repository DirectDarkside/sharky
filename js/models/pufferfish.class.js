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
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_SWIMMING.length;
            this.img = this.imageCache[this.IMAGES_SWIMMING[index]];
            this.currentImage++;
        }, 150);
    }
   
}