class DrawableObject {
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 150;
    imageCache = {};
    currentImage = 0;


    constructor() {

    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}