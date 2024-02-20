let canvas;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World();
    

    console.log('My Character is', world.character);
}