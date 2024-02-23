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
        console.log('Moving right')
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 0.250);
    }
}