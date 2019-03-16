const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; // Stop fn from running when user is not moused down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath(); // Start path
    ctx.moveTo(lastX, lastY); // Start position
    ctx.lineTo(e.offsetX, e.offsetY); // Move position
    ctx.stroke(); // Generate line
    // lastX = e.offsetX;
    // lastY = e.offsetY;
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update end position
    // ES6 single line alternative of above using array destructuring

    hue++; // Increment the hue
    if (hue >= 360) { // Reset when reaching the max hue
        hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) { // Set lineWidth limits
        direction = !direction; // Flip the direction
    }
    if (direction) {
        ctx.lineWidth++; // Increment from 0 to 100
    } else {
        ctx.lineWidth--; // Decrement from 100 to 0
    }

}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true; // Flag to test for true
    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update X & Y to current click position
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);