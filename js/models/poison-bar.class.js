class PoisonBar extends DrawableObject {

    progress = 0;
    IMAGES = [
        "./assets/img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
        "./assets/img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
        "./assets/img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
        "./assets/img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
        "./assets/img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
        "./assets/img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
    ];

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 40;
        this.y = 110;
        this.width = 180;
        this.height = 50;
        this.setPercentage(this.progress);
    }
}