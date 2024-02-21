class BackgroundObject extends MovableObject {
    
    x = 300;
    y = 340;
    width = 350;

    constructor(imagePath) {
        super().loadImage(imagePath);
    }
}