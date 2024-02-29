class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];

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
  }

  checkThrowObjects() {
    if(this.keyboard.SPACE) {
      let bottle = new ThrowableObject(this.character.hitbox.right, this.character.hitbox.top + 20);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)) {
          console.log('Hit');
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          console.log(this.character.energy);
      }
  });
    this.throwableObjects.forEach((throwableObject) => {
      this.level.enemies.forEach((enemy, index) => {
        if(enemy.isColliding(throwableObject)) {
          console.log('Bubble Hit');
          this.level.enemies.splice(index, 1);
        }
      });
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
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    //Draw() wird immer wieder aufgerufen
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

    if(mo.hitbox) {
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
