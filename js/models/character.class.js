class Character extends MovableObject {
  speed = 8;
  wait = 0;
  currentIndex = 0;
  jellyfish = false;
  pufferfish = false;
  dead = false;

  offset = {
    top: 60,
    left: 25,
    right: 45,
    bottom: 80
  }

  IMAGES_SWIMMING = [
    "./assets/img/1.Sharkie/1.IDLE/1.png",
    "./assets/img/1.Sharkie/1.IDLE/2.png",
    "./assets/img/1.Sharkie/1.IDLE/3.png",
    "./assets/img/1.Sharkie/1.IDLE/4.png",
    "./assets/img/1.Sharkie/1.IDLE/5.png",
    "./assets/img/1.Sharkie/1.IDLE/6.png",
    "./assets/img/1.Sharkie/1.IDLE/7.png",
    "./assets/img/1.Sharkie/1.IDLE/8.png",
    "./assets/img/1.Sharkie/1.IDLE/9.png",
    "./assets/img/1.Sharkie/1.IDLE/10.png",
    "./assets/img/1.Sharkie/1.IDLE/11.png",
    "./assets/img/1.Sharkie/1.IDLE/12.png",
    "./assets/img/1.Sharkie/1.IDLE/13.png",
    "./assets/img/1.Sharkie/1.IDLE/14.png",
    "./assets/img/1.Sharkie/1.IDLE/15.png",
    "./assets/img/1.Sharkie/1.IDLE/16.png",
    "./assets/img/1.Sharkie/1.IDLE/17.png",
    "./assets/img/1.Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIMMING_MOVEMENT = [
    "./assets/img/1.Sharkie/3.Swim/1.png",
    "./assets/img/1.Sharkie/3.Swim/2.png",
    "./assets/img/1.Sharkie/3.Swim/3.png",
    "./assets/img/1.Sharkie/3.Swim/4.png",
    "./assets/img/1.Sharkie/3.Swim/5.png",
    "./assets/img/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_SLEEP = [
    "./assets/img/1.Sharkie/2.Long_IDLE/I1.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I2.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I3.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I4.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I5.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I6.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I7.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I8.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I9.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I10.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I11.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I12.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I13.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  IMAGES_ONLY_SLEEP = [
    "./assets/img/1.Sharkie/2.Long_IDLE/I11.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I12.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I13.png",
    "./assets/img/1.Sharkie/2.Long_IDLE/I14.png",
  ];
  IMAGES_POISON_HURT = [
    "./assets/img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "./assets/img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "./assets/img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "./assets/img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];
  IMAGES_ELECTRIC_SHOCK = [
    "./assets/img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "./assets/img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "./assets/img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
  ];
  IMAGES_DEAD = [
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "./assets/img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  IMAGES_BUBBLE_ATTACK = [
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];
  IMAGES_POISON_BUBBLE_ATTACK = [
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "./assets/img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];
  IMAGES_SLAP_ATTACK = [
    "./assets/img/1.Sharkie/4.Attack/Fin slap/1.png",
    "./assets/img/1.Sharkie/4.Attack/Fin slap/4.png",
    "./assets/img/1.Sharkie/4.Attack/Fin slap/5.png",
    "./assets/img/1.Sharkie/4.Attack/Fin slap/6.png",
    "./assets/img/1.Sharkie/4.Attack/Fin slap/7.png",
    "./assets/img/1.Sharkie/4.Attack/Fin slap/8.png",
  ];
  world;
  swimming_sound = new Audio('./assets/audio/swimming_sound.mp3');
  hurt_sound = new Audio('./assets/audio/character_hurt.mp3');
  movement = false;

  constructor() {
    super().loadImage("./assets/img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_ONLY_SLEEP);
    this.loadImages(this.IMAGES_SWIMMING_MOVEMENT);
    this.loadImages(this.IMAGES_POISON_HURT);
    this.loadImages(this.IMAGES_ELECTRIC_SHOCK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_BUBBLE_ATTACK);
    this.loadImages(this.IMAGES_POISON_BUBBLE_ATTACK);
    this.loadImages(this.IMAGES_SLAP_ATTACK);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.swimming_sound.pause();
      this.checkMovement();
      this.world.camera_x = -this.x + 100;
      this.world.statusBar.x = this.x - 80;
      this.world.coinsBar.x = this.x - 80;
      this.world.poisonBar.x = this.x - 80;
    }, 1000 / 60);

    setInterval(() => {
      //Wait Animation
       this.checkAnimations();
    }, 150);
  }

  checkMovement() {
    this.checkMoveRight();
    this.checkMoveLeft();
    this.checkMoveUp();
    this.checkMoveDown();
    this.checkCharacterMovement();
  }

  checkCharacterMovement() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      world.character.movement = true;
    } else {
      world.character.movement = false;
    }
  }

  checkMoveDown() {
    if (this.world.keyboard.DOWN && this.y < 355) {
      this.moveDown();
      this.swimming_sound.play();
      this.resetSleepAnimation();
    }
  }

  checkMoveUp() {
    if (this.world.keyboard.UP && this.y > -50) {
      this.moveUp();
      this.swimming_sound.play();
      this.resetSleepAnimation();
    }
  }

  checkMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.swimming_sound.play();
      this.resetSleepAnimation();
    }
  }

  checkMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.swimming_sound.play();
      this.resetSleepAnimation();
    }
  }

  checkAnimations() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if(this.isHurt()) {
      this.jellyfish ? this.playAnimation(this.IMAGES_ELECTRIC_SHOCK) : this.playAnimation(this.IMAGES_POISON_HURT);
    } else if(this.isAttack()) {
      this.checkAttack();
    } else if(this.isWaiting()) {
      this.playSleepAnimation();
    } else if(!this.movement) {
      this.playAnimation(this.IMAGES_SWIMMING);
    } else if(this.movement) {
      this.playAnimation(this.IMAGES_SWIMMING_MOVEMENT);
    }
  }

  checkAttack() {
    if(this.world.keyboard.D) {
      this.playAnimation(this.IMAGES_SLAP_ATTACK);
    } else if(this.world.keyboard.SPACE) {
      if(this.world.poisonBar.progress == 100) {
        this.playAnimation(this.IMAGES_POISON_BUBBLE_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_BUBBLE_ATTACK);
      }
    }
  }

  playSleepAnimation() {
    if(this.currentIndex >= this.IMAGES_SLEEP.length) {
      this.playAnimation(this.IMAGES_ONLY_SLEEP);
    } else {
      let index = this.currentIndex;
      this.img = this.imageCache[this.IMAGES_SLEEP[index]];
      this.currentIndex++;
    }
  }

  resetSleepAnimation() {
    this.currentIndex = 0;
    this.wait = 0;
  }

  isWaiting() {
    if(this.wait >= 50) {
      return true;
    } else {
      this.wait++;
      return false;
    }
  }

  isAttack() {
    if(this.world.keyboard.SPACE || this.world.keyboard.D) {
      this.resetSleepAnimation();
      return true;
    } else {
      return false;
    }
  }
}
