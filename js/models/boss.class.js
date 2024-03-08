class Boss extends MovableObject {

  IMAGES_INTRODUCE = [
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "./assets/img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_SWIMMING = [
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "./assets/img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_ATTACK = [
    "./assets/img/2.Enemy/3 Final Enemy/Attack/1.png",
    "./assets/img/2.Enemy/3 Final Enemy/Attack/2.png",
    "./assets/img/2.Enemy/3 Final Enemy/Attack/3.png",
    "./assets/img/2.Enemy/3 Final Enemy/Attack/4.png",
    "./assets/img/2.Enemy/3 Final Enemy/Attack/5.png",
    "./assets/img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_HURT = [
    "./assets/img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "./assets/img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "./assets/img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "./assets/img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  IMAGES_DEAD = [
    "./assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "./assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "./assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "./assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "./assets/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];
  energy = 100;
  hadFirstContact = false;
  spawn = false;
  attack = false;
  counter = 0;
  goLeft = true;
  goRight = false;

  offset = {
    top: 90,
    left: 20,
    right: 40,
    bottom: 120,
  };

  constructor(x, y) {
    super().loadImage("./assets/img/2.Enemy/3 Final Enemy/2.floating/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.height = 300;
    this.width = 400;
    this.x = x;
    this.y = y;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.spawn) {
        if (!this.hadFirstContact) {
          this.x = 700;
          this.y = 100;
          if (this.counter < 10) {
            this.playAnimation(this.IMAGES_INTRODUCE);
          } else {
            this.hadFirstContact = true;
          }
          this.counter++;
        } else {
          if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
          } else if(this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
          } else if (this.attack) {
            this.playAnimation(this.IMAGES_ATTACK);
          } else {
            this.playAnimation(this.IMAGES_SWIMMING);
          }
          this.move();
        }
      }
    }, 150);
  }

  move() {
    if(this.goLeft) {
      this.x -= 7.5;
    } else if(this.goRight) {
      this.x += 7.5;
    }
  }
}
