let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d"); //This line gets the 2D rendering context of the canvas. The rendering context is like a control panel or a toolbox that provides all the methods

let size = window.innerWidth; //this line of code gets the inner width of the browser window in pixels This line of code gets the inner width of the browser window in pixels. This value represents the width of the browser's viewport, which is the area where the web content is displayed.
let dpr = window.devicePixelRatio; //This line of code gets the device pixel ratio of the display. This ratio compares the number of physical pixels on the screen to the number of CSS pixels.

canvas.width = size * dpr;
canvas.height = size * dpr;
//These two lines set the actual pixel dimensions of the canvas. Instead of using the CSS width and height, which only scale the element, these properties change the number of pixels the browser has to work with.

context.scale(dpr, dpr); //This line scales the entire canvas's coordinate system.This method scales the canvas's coordinate system by the dpr value on both the X and Y axes.

context.lineWidth = 10;
let step = size / Math.floor(Math.random() * 10);
let white = "#F2F5F1";
let colors = ["#D40920", "#1356A2", "#F7D842"];

let squares = [
  {
    x: 0,
    y: 0,
    width: size,
    height: size,
  },
]; //this variable squares allows us to make an array of squares

//function to draw the squares within the grid
/*
const { x, y } = coordinates is extracting the x and y variables out of the object we’re passing, eg {x: 160} or {y: 160}
We’re looping backwards through the squares with (var i = squares.length - 1; i >= 0; i--) this is because we’re taking elements out of the loop (and replacing them with 2 squares), looping backwards means the order will stay the same, and the new items won’t be split again.

*/

function splitSquaresWith(coordinates) {
  const { x, y } = coordinates;

  for (let i = squares.length - 1; i >= 0; i--) {
    // Loops through the squares, and find if one should be split
    const square = squares[i];
    if (x && x > square.x && x < square.x + square.width) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnX(square, x);
      }
    }

    if (y && y > square.y && y < square.y + square.height) {
      if (Math.random() > 0.5) {
        squares.splice(i, 1);
        splitOnY(square, y);
      }
    }
  }
}

function splitOnX(square, splitAt) {
  // Create two new squares, based on
  // splitting the given one at the
  // x coordinate given
  let squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y),
  };

  let squareB = {
    x: splitAt,
    y: square.y,
    width: square.width - splitAt + square.x,
    height: square.height,
  };

  squares.push(squareA);
  squares.push(squareB);
}

function splitOnY(square, splitAt) {
  var squareA = {
    x: square.x,
    y: square.y,
    width: square.width,
    height: square.height - (square.height - splitAt + square.y),
  };

  var squareB = {
    x: square.x,
    y: splitAt,
    width: square.width,
    height: square.height - splitAt + square.y,
  };

  squares.push(squareA);
  squares.push(squareB);
}

for (var i = 0; i < size; i += step) {
  splitSquaresWith({ y: i });
  splitSquaresWith({ x: i });
}

function draw() {
  for (var i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  }
  for (var i = 0; i < squares.length; i++) {
    context.beginPath();
    context.rect(
      squares[i].x,
      squares[i].y,
      squares[i].width,
      squares[i].height
    );
    if (squares[i].color) {
      context.fillStyle = squares[i].color;
    } else {
      context.fillStyle = white;
    }
    context.fill();
    context.stroke();
  }
}

draw();
