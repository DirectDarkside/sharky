/**
 * This is the Coin
 * @class
 */
class Coin extends MovableObject {
  takeSound = new Audio("./assets/audio/take_coin.mp3");

  IMAGES = [
    "./assets/img/4. Marcadores/1. Coins/1.png",
    "./assets/img/4. Marcadores/1. Coins/2.png",
    "./assets/img/4. Marcadores/1. Coins/3.png",
    "./assets/img/4. Marcadores/1. Coins/4.png",
  ];

  constructor(x, y) {
    super().loadImage("./assets/img/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES);
    this.height = 50;
    this.width = 50;
    this.x = 200 + Math.random() * 1500;
    this.y = 100 + Math.random() * 300;
    this.animate();
  }

  /**
   * Animate the coin object
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 175);
  }
}
