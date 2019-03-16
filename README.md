# HTML Canvas

Fun with HTML canvas built as part of 'JavaScript30' with Wes Bos.

Enables the user to click and draw lines on the page. The stroke width and colour hue increase and decrease dynamically.

Live demo: https://lukeprosser.github.io/html_canvas/

## HTML & CSS

A basic HTML canvas is set up with and id of 'draw', as well as HTML body margin set to '0'.

## JavaScript

### Setup

Firstly, the canvas parameters are set:

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;

Next, a number of flags are stored:

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

By default, without any user input, the state 'isDrawing' is set to false so that nothing happens if the user hasn't clicked.

The 'direction' is also set so that this can be changed later.

The most recent x and y positions need to be stored so that they can be updated on the fly.

### Event Listeners

Event listeners are set up to enable and disable the drawing state:

canvas.addEventListener('mousedown', (e) => {
isDrawing = true; // Flag to test for true
[lastX, lastY] = [e.offsetX, e.offsetY]; // Update X & Y to current click position
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

When the mouse clicks, 'isDrawing' is set to 'true' and the x and y positions are set to the current click position.

When the user stops holding down the click, and when they move out of the window area, the 'isDrawing' state is set to false.

When the mouse is clicked and moved, the 'draw' function is called.

### draw() function

If the user is not currently drawing, the function is ended.

Otherwise, the path is initiated with 'beginPath()'. The x and y starting position is set, as well as the new position.

A stroke is generated between these points and the end position is updated.

The colour hue is incremented until it reaches 360, at which point it resets to 0 to begin again.

The 'direction' variable is used to dictate the thickness of the stroke. If direction is 'true', the line width is incremented. If direction is 'false', it's decremented.

The boolean value of 'direction' is flipped once the line width is greater than or equal to 100, or less than or equal to 1.
