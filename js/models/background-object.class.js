/**
 * This is the BackgroundObject
 * @class
 */
class BackgroundObject extends MovableObject {
    
    width;
    height;

    constructor(imagePath, x, y, width = 350, height =  150) {
        super().loadImage(imagePath);
        this.x = x
        this.y = y;
        this.width = width;
        this.height = height;
    }
}