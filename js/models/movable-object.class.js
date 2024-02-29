class MovableObject extends DrawableObject {
   
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    hitbox;

    constructor() {
        super();
        this.hitbox = this.setHitbox();
    }


    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    playAnimation(images) {
        let index = this.currentImage % images.length;
            this.img = this.imageCache[images[index]];
            this.currentImage++;
    }

    isColliding(mo) {
        this.hitbox.right = Math.abs(this.hitbox.right);
        return (
          this.hitbox.right > mo.hitbox.left &&
          this.hitbox.bottom > mo.hitbox.top &&
          this.hitbox.left < mo.hitbox.left &&
          this.hitbox.top < mo.hitbox.bottom ||
          this.hitbox.left < mo.hitbox.right && 
          this.hitbox.top <  mo.hitbox.bottom &&
          this.hitbox.left > mo.hitbox.left
        );
    }

    // this.x + this.width > mo.x &&
    //       this.y + this.height > mo.y &&
    //       this.x < mo.x &&
    //       this.y < mo.y + mo.height ||
    //       this.x < mo.x + mo.width && 
    //       this.y < mo.y + mo.height &&
    //       this.x > mo.x

    hit() {
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    setHitbox() {
        return {
            left: this.x + this.offset.left,
            top: this.y + this.offset.top,
            right: this.x + this.width - this.offset.right,
            bottom: this.y + this.height - this.offset.bottom
        };
    }
}