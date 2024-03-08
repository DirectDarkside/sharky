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
  gameOver = false;
  loadDeath = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    document.getElementById('restart_img').style.display = 'none';
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
      this.checkPlayerPosition();
      this.checkGameOver();
    }, 100);
  }

  checkGameOver() {
    const bossIndex = this.level.enemies.length - 1;
    if(this.level.enemies[bossIndex].dead) {
      if(!this.loadDeath) {
        setTimeout(() => {
          this.gameOver = true;
         document.getElementById('restart_img').style.display = 'flex';
        }, 3000);
        this.loadDeath = true;
      }
    }
  }

  checkPlayerPosition() {
    this.level.enemies.forEach(enemy => {
      if(enemy instanceof Boss) {
        if(this.character.x < enemy.x + 70) {
          enemy.goLeft = true;
          enemy.goRight = false;
          enemy.otherDirection = false;
        } else {
          enemy.goLeft = false;
          enemy.goRight = true;
          enemy.otherDirection = true;
        }
      }
    });
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
      if(this.character.otherDirection) {
        this.createOtherDirectionThrowableObject();
      } else {
        this.createThrowableObject();
      }
    }
  }

  createThrowableObject() {
    let bubble = new ThrowableObject(
      this.character.hitbox.right,
      this.character.hitbox.top + 20,
      this.character.otherDirection
    );
    this.checkPoisonBubble(bubble);
    this.throwableObjects.push(bubble);
  }

  createOtherDirectionThrowableObject() {
    let bubble = new ThrowableObject(
      this.character.hitbox.left,
      this.character.hitbox.top + 20,
      this.character.otherDirection
    );
    this.checkPoisonBubble(bubble);
    this.throwableObjects.push(bubble);
}

checkPoisonBubble(bubble) {
  if (this.poisonBar.progress == 100) {
    bubble.img.src =
      "./assets/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";
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
      this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }, 3500);
  }

  checkHitCollision() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(throwableObject)) {
          this.hitJellyfish(enemy);
          this.hitBoss(enemy);     
          this.throwableObjects.splice(throwableIndex, 1);
        }
      });
    });
  }

  hitBoss(enemy) {
    if (enemy instanceof Boss && this.poisonBar.progress == 100) {
      console.log(enemy.energy);
      enemy.hit();
    }
  }

  hitJellyfish(enemy) {
    if (enemy instanceof Jellyfish) {
      enemy.kill();
      setTimeout(() => {
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
      }, 4500);
    }
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
    if(!this.gameOver) {
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
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.addObjectsToMap(this.level.gameOverObjects);
    }
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
