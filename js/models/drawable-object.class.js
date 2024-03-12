class DrawableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 150;
  imageCache = {};
  currentImage = 0;

  constructor() {}

  /**
   * 
   * Create image object and set the url
   * @param {string} path - The URL path of the image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * 
   * Draw image in the canvas
   * @param {object} ctx - Is the canvas draw tool
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Load all images in the imageCache
   * @param {array} arr - Image Array to load all images in the imageCache
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Pufferfish ||
      this instanceof Boss ||
      this instanceof Coin ||
      this instanceof ThrowableObject ||
      this instanceof Jellyfish
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * 
   * This function updates the percentage attribute to the passed value and updates the image attribute from an image cache based on the path determined by the restartImageIndex() method.
   * @param {number} persentage 
   */
  setPercentage(persentage) {
    this.persentage = persentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * 
   * Return a Number
   * @returns {number}
   */
  resolveImageIndex() {
    if (this.persentage == 100) {
      return 5;
    } else if (this.persentage == 80) {
      return 4;
    } else if (this.persentage == 60) {
      return 3;
    } else if (this.persentage == 40) {
      return 2;
    } else if (this.persentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
