class MovableObject {
    x = 120;
    y = 300;
    img;
    height = 150;
    width = 150;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
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
}