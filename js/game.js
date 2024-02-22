let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    keyboard = new Keyboard();
    

    console.log('My Character is', world.character);
}

document.addEventListener('keypress', (event) => {
    console.log(event);
});