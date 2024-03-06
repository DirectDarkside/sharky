class StatusBar extends DrawableObject {

    IMAGES = [
        './assets/img/4. Marcadores/green/Life/0_  copia 3.png',
        './assets/img/4. Marcadores/green/Life/20_ copia 4.png',
        './assets/img/4. Marcadores/green/Life/40_  copia 3.png',
        './assets/img/4. Marcadores/green/Life/60_  copia 3.png',
        './assets/img/4. Marcadores/green/Life/80_  copia 3.png',
        './assets/img/4. Marcadores/green/Life/100_  copia 2.png',
    ];

    persentage = 100;

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 50;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

   
}