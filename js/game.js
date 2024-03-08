let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  keysBindAction();
  bindTouchAction();
  bindRestartAction();
}

function bindRestartAction() {
  document.getElementById("restart_img").addEventListener("click", () => {
    document.getElementById("restart_img").style.display = "none";
    resetLevel();
    init();
  });
}

function keysBindAction() {
  setBindActionDown();
  setBindActionUp();
}

function setBindActionDown() {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (event.keyCode == 38) {
        keyboard.UP = true;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (event.keyCode == 68) {
        keyboard.D = true;
      }
    });
}

function setBindActionUp() {
    document.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (event.keyCode == 38) {
        keyboard.UP = false;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (event.keyCode == 68) {
        keyboard.D = false;
      }
    });
}

function setMobileUpEvent() {
  document.getElementById("up_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById("up_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
}

function setMobileLeftEvent() {
  document.getElementById("left_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
}

function setMobileDownEvent() {
  document.getElementById("down_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });
  document.getElementById("down_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });
}

function setMobileRightEvent() {
  document
    .getElementById("right_button")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });
  document.getElementById("right_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
}

function setMobileSlapEvent() {
  document.getElementById("slap_button").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("slap_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}

function setMobileShootEvent() {
  document
    .getElementById("shoot_button")
    .addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });
  document.getElementById("shoot_button").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

function bindTouchAction() {
  setMobileUpEvent();
  setMobileLeftEvent();
  setMobileDownEvent();
  setMobileRightEvent();
  setMobileSlapEvent();
  setMobileShootEvent();
}

function fullscreen() {
  const fullscreen = document.getElementById("canvas_container");
  openFullscreen(fullscreen);
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
