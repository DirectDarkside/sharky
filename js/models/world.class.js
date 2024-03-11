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
  backgroundSound = new Audio('./assets/audio/bg_music.mp3');

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.setAudios();
    this.run();
    this.backgroundSound.volume = 0.3;
    this.backgroundSound.play();
    document.getElementById('restart_img').style.display = 'none';
  }

  setAudios() {
    this.level.audioElements.push(this.backgroundSound);
    this.level.audioElements.push(this.character.swimming_sound);
    this.level.audioElements.push(this.character.hurt_sound);
    this.level.audioElements.push(this.level.enemies[this.level.enemies.length - 1].hurt_sound);
    this.level.items.forEach(item => {
      this.level.audioElements.push(item.takeSound)
    });
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
      this.checkGameWin();
      this.checkGameOver();
      checkDeviceOrientation()
    }, 100);
  }

  checkGameOver() {
    if(this.character.energy == 0) {
      if(!this.loadDeath) {
        setTimeout(() => {
          this.character.dead = true;
          this.gameOver = true;
          mutePage();
          stopSounds();
         document.getElementById('restart_img').style.display = 'flex';
        }, 900);
        this.loadDeath = true;
      }
    }
  }

  checkGameWin() {
    const bossIndex = this.level.enemies.length - 1;
    if(this.level.enemies[bossIndex].dead) {
      if(!this.loadDeath) {
        setTimeout(() => {
          this.gameOver = true;
         document.getElementById('restart_img').style.display = 'flex';
         mutePage();
         stopSounds();
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
    if (this.character.x > 1600 && !this.bossIntroduce) {
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
          item.takeSound.play();
          this.coinsBar.progress += 20;
          this.coinsBar.setPercentage(this.coinsBar.progress);
          this.level.items.splice(index, 1);
        } else if (item instanceof Poison) {
          item.takeSound.play();
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
    this.character.hurt_sound.play();
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
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
      enemy.hurt_sound.play();
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
      this.addAllObjects();  
      this.ctx.translate(-this.camera_x, 0);
      this.backgroundSound.play();
    } else if(this.character.dead) {
      this.addObjectsToMap(this.level.gameOverObjects);
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.addObjectsToMap(this.level.gameWinObjects);
    }
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addAllObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.items);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.character);
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
