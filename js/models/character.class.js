class Character extends MovableObject {

    speed = 8;

    IMAGES_SWIMMING = [
        './assets/img/1.Sharkie/1.IDLE/1.png',
            './assets/img/1.Sharkie/1.IDLE/2.png',
            './assets/img/1.Sharkie/1.IDLE/3.png',
            './assets/img/1.Sharkie/1.IDLE/4.png',
            './assets/img/1.Sharkie/1.IDLE/5.png',
            './assets/img/1.Sharkie/1.IDLE/6.png',
            './assets/img/1.Sharkie/1.IDLE/7.png',
            './assets/img/1.Sharkie/1.IDLE/8.png',
            './assets/img/1.Sharkie/1.IDLE/9.png',
            './assets/img/1.Sharkie/1.IDLE/10.png',
            './assets/img/1.Sharkie/1.IDLE/11.png',
            './assets/img/1.Sharkie/1.IDLE/12.png',
            './assets/img/1.Sharkie/1.IDLE/13.png',
            './assets/img/1.Sharkie/1.IDLE/14.png',
            './assets/img/1.Sharkie/1.IDLE/15.png',
            './assets/img/1.Sharkie/1.IDLE/16.png',
            './assets/img/1.Sharkie/1.IDLE/17.png',
            './assets/img/1.Sharkie/1.IDLE/18.png',
    ];
    IMAGES_SWIMMING_MOVEMENT = [
        './assets/img/1.Sharkie/3.Swim/1.png',
        './assets/img/1.Sharkie/3.Swim/2.png',
        './assets/img/1.Sharkie/3.Swim/3.png',
        './assets/img/1.Sharkie/3.Swim/4.png',
        './assets/img/1.Sharkie/3.Swim/5.png',
        './assets/img/1.Sharkie/3.Swim/6.png',
    ];
    world;
    swimming_sound = new Audio('./assets/audio/swimming_sound.mp3');
    movement = false;

    constructor() {
        super().loadImage('./assets/img/1.Sharkie/1.IDLE/1.png')
        this.loadImages(this.IMAGES_SWIMMING);   
        this.loadImages(this.IMAGES_SWIMMING_MOVEMENT); 

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.swimming_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.swimming_sound.play();
            }
            if(this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimming_sound.play();
            }
            if(this.world.keyboard.UP && this.y > -50) {
                this.y -= this.speed;
                this.swimming_sound.play();
            }
            if(this.world.keyboard.DOWN && this.y < 355) {
                this.y += this.speed;
                this.swimming_sound.play();
            }
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                world.character.movement = true;
            } else {
                world.character.movement = false;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        
        setInterval(() => {
            //Wait Animation
            if(!this.movement) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else if(this.movement) {
                this.playAnimation(this.IMAGES_SWIMMING_MOVEMENT);
            }
        }, 150);
        
    }

    moveUp() {

    }
    
}