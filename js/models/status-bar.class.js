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
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
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