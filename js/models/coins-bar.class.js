class CoinsBar extends DrawableObject{

    IMAGES = [
        "./assets/img/4. Marcadores/green/Coin/0_  copia 4.png",
        "./assets/img/4. Marcadores/green/Coin/20_  copia 2.png",
        "./assets/img/4. Marcadores/green/Coin/40_  copia 4.png",
        "./assets/img/4. Marcadores/green/Coin/60_  copia 4.png",
        "./assets/img/4. Marcadores/green/Coin/80_  copia 4.png",
        "./assets/img/4. Marcadores/green/Coin/100_ copia 4.png",
    ];

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 40;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}