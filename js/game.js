let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    keysBindAction();
    bindTouchAction();
}

function keysBindAction () {
    document.addEventListener('keydown', (event) => {
    
        if(event.keyCode == 39) {
            keyboard.RIGHT = true;
        }
    
        if(event.keyCode == 37) {
            keyboard.LEFT = true;
        }
    
        if(event.keyCode == 38) {
            keyboard.UP = true;
        }
    
        if(event.keyCode == 40) {
            keyboard.DOWN = true;
        }
    
        if(event.keyCode == 32) {
            keyboard.SPACE = true;
        }
    
        if(event.keyCode == 68) {
            keyboard.D = true;
        }
        
    });   
    document.addEventListener('keyup', (event) => {
        
        if(event.keyCode == 39) {
            keyboard.RIGHT = false;
        }
    
        if(event.keyCode == 37) {
            keyboard.LEFT = false;
        }
    
        if(event.keyCode == 38) {
            keyboard.UP = false;
        }
    
        if(event.keyCode == 40) {
            keyboard.DOWN = false;
        }
    
        if(event.keyCode == 32) {
            keyboard.SPACE = false;
        }
    
        if(event.keyCode == 68) {
            keyboard.D = false;
        }
        
    });
}

function bindTouchAction() {
    document.getElementById('up_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('up_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('left_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('left_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('down_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.DOWN = true;
    });
    document.getElementById('down_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.DOWN = false;
    });
    document.getElementById('right_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('right_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('slap_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('slap_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById('shoot_button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('shoot_button').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function fullscreen() {
    const fullscreen = document.getElementById('canvas_container');
    openFullscreen(fullscreen);
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}