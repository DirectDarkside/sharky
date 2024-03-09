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

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Pufferfish || this instanceof Boss || this instanceof Coin || this instanceof ThrowableObject || this instanceof Jellyfish) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    setPercentage(persentage) {
        this.persentage = persentage;
        const path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.persentage == 100) {
            return 5;
        } else if(this.persentage == 80) {
            return 4;
        } else if(this.persentage == 60) {
            return 3;
        } else if(this.persentage == 40) {
            return 2;
        } else if(this.persentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}