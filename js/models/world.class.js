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
  backgroundSound = new Audio("./assets/audio/bg_music.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.setAudios();
    this.run();
    this.backgroundSound.volume = 0.15;
    this.backgroundSound.play();
    document.getElementById("restart_img").style.display = "none";
  }

  /**
   * Push all sounds in the audioElements array
   */
  setAudios() {
    this.level.audioElements.push(this.backgroundSound);
    this.level.audioElements.push(this.character.swimming_sound);
    this.level.audioElements.push(this.character.hurt_sound);
    this.level.audioElements.push(
      this.level.enemies[this.level.enemies.length - 1].hurt_sound
    );
    this.level.items.forEach((item) => {
      this.level.audioElements.push(item.takeSound);
    });
  }

  /**
   * Set character.world to this world
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * This function runs three intervals:
   * The first checks object throwing and object collisions every 300 milliseconds.
   * The second interval checks general collisions every 500 milliseconds.
   * The third interval checks various aspects such as hit collisions, enemy collisions, boss appearances, player position, and win and game loss conditions every 100 milliseconds.
   */
  run() {
    setInterval(() => {
      this.checkItemCollision();
    }, 300);
    setInterval(() => {
      this.checkCollisions();
    }, 500);
    setInterval(() => {
      this.checkHitCollision();
      this.checkEnemyCollision();
      this.checkEndbossSpawn();
      this.checkPlayerPosition();
      this.checkGameWin();
      this.checkGameOver();
    }, 100);
  }

  /**
   * This function checks whether the character's energy has fallen to zero.
   * If so, it sets some game parameters such as character death and game end and changes the game menu accordingly after a short delay of 900 milliseconds.
   */
  checkGameOver() {
    if (this.character.energy == 0) {
      if (!this.loadDeath) {
        setTimeout(() => {
          this.character.dead = true;
          this.gameOver = true;
          mutePage();
          stopSounds();
          document.getElementById("restart_img").style.display = "flex";
        }, 900);
        this.loadDeath = true;
      }
    }
  }

  /**
   * This function checks whether the final boss of the level has been defeated by checking whether the corresponding index in the enemies list is marked dead.
   * If so, it sets the game end and changes the game menu accordingly after a delay of 3000 milliseconds.
   */
  checkGameWin() {
    const bossIndex = this.level.enemies.length - 1;
    if (this.level.enemies[bossIndex].dead) {
      if (!this.loadDeath) {
        setTimeout(() => {
          this.gameOver = true;
          document.getElementById("restart_img").style.display = "flex";
          mutePage();
          stopSounds();
        }, 3000);
        this.loadDeath = true;
      }
    }
  }

  /**
   * This feature checks the player's position relative to each enemy in the level.
   * If the enemy is a boss and the player is in a certain area to the left of him, the boss will be instructed to go left, otherwise he will be instructed to go right.
   */
  checkPlayerPosition() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Boss) {
        if (this.character.x < enemy.x + 70) {
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

  /**
   * This function checks whether the player has reached a certain position and whether the final boss has not yet been introduced.
   * If so, it sets some parameters for the final boss and marks his introduction as complete.
   */
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

  /**
   * This function checks whether the space bar has been pressed. If so, it creates a throwable depending on the character's orientation.
   */
  checkThrowObjects() {
    if (this.keyboard.SPACE) {
      if (this.character.otherDirection) {
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
  }

  /**
   * This function checks whether the character collides with an object in the level.
   * If there is a collision, depending on the type of object, the appropriate action will be taken, such as: E.g. playing a sound, updating the progress bar and removing the item from the level.
   */
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

  /**
   * This feature checks if the character collides with an enemy in the level.
   * If there is a collision, appropriate actions will be taken depending on whether the character collides with or hits the enemy.
   */
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

  /**
   * This function is called when a collision is detected between the character and an enemy in the level.
   * She performs various actions including playing a pain sound for the character, reducing the character's energy, updating the status bar, and if the enemy is a jellyfish, she sets a timer that sets the character's condition as "jellyfish" for maintained for one second.
   * @param {object} enemy - is a enemy object 
   */
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
  }

  /**
   * This feature checks whether thrown objects collide with enemies in the level.
   * When a collision is detected, corresponding actions are taken, such as hitting a jellyfish or a boss, as well as removing the thrown object from the thrown object list.
   */
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
    }
  }

  /**
   * This function checks whether the character collides with enemies in the level.
   * When a collision is detected, the corresponding enemy is marked and if it is a boss, its attack variable is set to true.
   * Otherwise, the collision is set to false and the boss's attack variable is set to false.
   */
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

  /**
   * This feature draws game action on the screen based on the current game status.
   * If the game is not over, the screen will be blanked, the camera will move according to the game situation, objects will be added, and the background sound will play.
   * If the game is over and the character is dead, objects are added for ending the game, otherwise objects are added for winning the game.
   * The function then calls itself again with requestAnimationFrame to allow continuous updating of the screen.
   */
  draw() {
    if (!this.gameOver) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.addAllObjects();
      this.ctx.translate(-this.camera_x, 0);
      this.backgroundSound.play();
    } else if (this.character.dead) {
      this.addObjectsToMap(this.level.gameOverObjects);
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.addObjectsToMap(this.level.gameWinObjects);
    }
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * This feature adds all of the game's objects to the map, including background objects, enemies, items, thrown objects, as well as status bars and the character himself.
   */
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

  /**
   * 
   * This function adds a list of objects to the map by iterating through each object and adding each of them to the map.
   * @param {array} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * This function adds an object to display on the map.
   * It first checks whether the object is facing the opposite direction and, if necessary, applies reflection to adjust the appearance.
   * Then the object is drawn, its hitbox is updated and the mirroring is undone if necessa
   * @param {object} mo 
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.hitbox) {
      mo.hitbox = mo.setHitbox();
    }
    if (mo.otherDirection) {
      this.flipIMageBack(mo);
    }
  }

  /**
   * This function flips the image of an object horizontally using the drawing context transformation.
   * First, the current drawing state is saved, then the coordinate system is moved and scaled to mirror the object, and the object's x position is adjusted accordingly.
   * @param {object} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * This feature restores the original orientation of an object's image after flipping it horizontally.
   * It changes the object's x position accordingly and then restores the previous drawing state to undo the mirroring.
   * @param {object} mo - moveable object 
   */
  flipIMageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
