let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d"); //This line gets the 2D rendering context of the canvas. The rendering context is like a control panel or a toolbox that provides all the methods

let size = window.innerWidth; //this line of code gets the inner width of the browser window in pixels This line of code gets the inner width of the browser window in pixels. This value represents the width of the browser's viewport, which is the area where the web content is displayed.
let dpr = window.devicePixelRatio; //This line of code gets the device pixel ratio of the display. This ratio compares the number of physical pixels on the screen to the number of CSS pixels.
canvas.width = size * dpr;
canvas.height = size * dpr;
//These two lines set the actual pixel dimensions of the canvas. Instead of using the CSS width and height, which only scale the element, these properties change the number of pixels the browser has to work with.
context.scale(dpr, dpr); //This line scales the entire canvas's coordinate system.This method scales the canvas's coordinate system by the dpr value on both the X and Y axes.
context.lineWidth = 8;

let squares = [
  {
    x: 0,
    y: 0,
    width: size,
    height: size,
  },
]; //this variable squares allows us to make an array of squares

//function to draw the squares within the grid

//function splitSquaresWith(coordinates) {
// Loops through the squares, and find if
// one should be split
//}

//function splitOnX(square, splitAt) {
// Create two new squares, based on
// splitting the given one at the
// x coordinate given
//}

//function splitOnY(square, splitAt) {
// Create two new squares, based on
// splitting the given one at the
// y coordinate given
//}
//Generate(){}
