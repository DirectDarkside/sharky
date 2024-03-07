class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinsBar = new CoinsBar();
  poisonBar = new PoisonBar();
  throwableObjects = [];
  bossIntroduce = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000);

    setInterval(() => {
      this.checkHitCollision();
      this.checkEnemyCollision();
      this.checkEndbossSpawn();
    }, 100);
  }

  checkEndbossSpawn() {
    if (this.character.x > 300 && !this.bossIntroduce) {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Boss) {
          enemy.counter = 0;
          enemy.hadFirstContact = false;
          enemy.spawn = true;
          this.bossIntroduce = true;
        }
      });
    }
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE) {
      if (this.character.otherDirection) {
        let bubble = new ThrowableObject(
          this.character.hitbox.left,
          this.character.hitbox.top + 20,
          this.character.otherDirection
        );
        if (this.poisonBar.progress == 100) {
          bubble.img.src =
            "./assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
        }
        this.throwableObjects.push(bubble);
      } else {
        let bubble = new ThrowableObject(
          this.character.hitbox.right,
          this.character.hitbox.top + 20,
          this.character.otherDirection
        );
        if (this.poisonBar.progress == 100) {
          bubble.img.src =
            "./assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
        }
        this.throwableObjects.push(bubble);
      }
    }
  }

  checkCollisions() {
    this.checkEnemiesCollision();
    this.checkItemCollision();
  }

  checkItemCollision() {
    this.level.items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        if (item instanceof Coin) {
          item.takeCoin.play();
          this.coinsBar.progress += 20;
          this.coinsBar.setPercentage(this.coinsBar.progress);
          this.level.items.splice(index, 1);
        } else if (item instanceof Poison) {
          this.poisonBar.progress += 20;
          this.poisonBar.setPercentage(this.poisonBar.progress);
          this.level.items.splice(index, 1);
        }
      }
    });
  }

  checkEnemiesCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        this.checkIfCollision(enemy);
      } else if (this.character.isSlapColliding(enemy)) {
        if (this.keyboard.D && enemy instanceof Pufferfish) {
          this.checkHitPufferfish(enemy, index);
        }
      }
    });
  }

  checkIfCollision(enemy) {
    console.log("Hit");
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    console.log(this.character.energy);
    if (enemy instanceof Jellyfish) {
      this.character.jellyfish = true;
      setTimeout(() => {
        this.character.jellyfish = false;
      }, 1000);
    }
  }

  checkHitPufferfish(enemy, index) {
    enemy.kill();
    enemy.deadAnimation();
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 3500);
  }

  checkHitCollision() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(throwableObject)) {
          if (enemy instanceof Jellyfish) {
            enemy.kill();
            console.log("Bubble Hit");
            setTimeout(() => {
              this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            }, 4500);
          }
          if (enemy instanceof Boss && this.poisonBar.progress == 100) {
            console.log(enemy.energy);
            enemy.hit();
          }
          this.throwableObjects.splice(throwableIndex, 1);
        }
      });
    });
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isColliding(this.character)) {
        enemy.collision = true;
        if (enemy instanceof Boss) {
          enemy.attack = true;
        }
      } else {
        enemy.collision = false;
        if (enemy instanceof Boss) {
          enemy.attack = false;
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.items);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.hitbox) {
      mo.hitbox = mo.setHitbox();
    }

    if (mo.otherDirection) {
      this.flipIMageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipIMageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
