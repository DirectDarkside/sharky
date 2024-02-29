class ThrowableObject extends MovableObject {

    constructor(x, y, orientation) {
        super().loadImage('./assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
        this.orientation = orientation;
        this.trow();
    }

    trow() {
        this.speed = 15;
        setInterval(() => {
            if(this.orientation) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 1000 / 60);
    }
}