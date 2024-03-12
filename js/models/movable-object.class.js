class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
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

  /**
   * 
   * This function plays an animation by setting the image attribute to the next image in the passed image sequence and incrementing the index of the current image, loading the images from an image cache.
   * @param {array} images - A image array 
   */
  playAnimation(images) {
    let index = this.currentImage % images.length;
    this.img = this.imageCache[images[index]];
    this.currentImage++;
  }

  /**
   * 
   * This function checks whether two objects collide with each other by comparing their positions and dimensions and returns a collision if their areas overlap.
   * @param {object} mo - moveable object
   * @returns {condition}
   */
  isColliding(mo) {
    this.hitbox.right = Math.abs(this.hitbox.right);
    this.hitbox.left = Math.abs(this.hitbox.left);
    return (
        this.hitbox.right >= mo.hitbox.left &&
        this.hitbox.bottom >= mo.hitbox.top &&
        this.hitbox.left <= mo.hitbox.right &&
        this.hitbox.top <= mo.hitbox.bottom  ||
        (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom) &&
        (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
          this.x + this.offset.left < mo.x + mo.width - mo.offset.right)  ||
          (this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.offset.bottom > mo.y + mo.offset.top) &&
            (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
              this.x + this.offset.left < mo.x + mo.width - mo.offset.right)
    );    
  }

  /**
   * 
   * This function checks whether two objects collide with each other by comparing their positions and dimensions and returns a collision if their areas overlap.
   * @param {object} mo - moveable object 
   * @returns {condition}
   */
  isSlapColliding(mo) {
    return (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom) &&
      (this.x + this.width - this.offset.right + 50 > mo.x + mo.offset.left &&
        this.x + this.offset.left + 50< mo.x + mo.width - mo.offset.right)  ||
        (this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
          this.y + this.offset.bottom > mo.y + mo.offset.top) &&
          (this.x + this.width - this.offset.right + 50 > mo.x + mo.offset.left &&
            this.x + this.offset.left + 50 < mo.x + mo.width - mo.offset.right);
  }

  /**
   * This function reduces an object's energy by 20 units and sets the last hit timestamp to the current time if the energy does not fall below zero. When the energy falls below zero, it is set to zero.
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * 
This function checks whether less than a second has passed since the last hit by calculating the difference between the current timestamp and the last hit timestamp and converting this difference to seconds. It returns true if less than a second has passed, otherwise false.
   * @returns {condition}
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * return a condition
   * @returns {condition}
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function calculates and returns a hitbox object that defines the position and size of an object based on its coordinates (x, y), as well as its offset values ​​(offset) and dimensions (width, height).
   * @returns {condition}
   */
  setHitbox() {
    return {
      left: this.x + this.offset.left,
      top: this.y + this.offset.top,
      right: this.x + this.width - this.offset.right,
      bottom: this.y + this.height - this.offset.bottom,
    };
  }
}
