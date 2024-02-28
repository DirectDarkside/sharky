class MovableObject extends DrawableObject {
   
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Pufferfish || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
        return (
          this.x + this.width > mo.x &&
          this.y + this.height > mo.y &&
          this.x < mo.x &&
          this.y < mo.y + mo.height
        );
    }

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
}