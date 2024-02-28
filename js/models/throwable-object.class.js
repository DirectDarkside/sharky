class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('./assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
        this.trow();
    }

    trow() {
        this.speed = 15;
        setInterval(() => {
            this.x += 10;
        }, 1000 / 60);
    }
}