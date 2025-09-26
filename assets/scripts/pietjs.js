// Use window.onload to ensure the canvas element is ready
window.onload = function () {
  let canvas = document.getElementById("myCanvas");
  let context = canvas.getContext("2d");

  // Define the canvas size based on the smaller of window width or height for a square aspect ratio
  const viewportSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  let size = viewportSize;
  let dpr = window.devicePixelRatio;

  canvas.width = size * dpr;
  canvas.height = size * dpr;
  context.scale(dpr, dpr);

  context.lineWidth = 10;
  context.lineCap = "round";

  let squares = [
    {
      x: 0,
      y: 0,
      width: size,
      height: size,
    },
  ];

  // Define the color palette and white for the grid
  const colors = ["#E33022", "#E8DF18", "#1E65AE", "#14181B"];
  const white = "#F0F0E8";
  const step = size / 5; // Define the step size for splitting

  // Function to split the squares based on a given coordinate
  function splitSquaresWith(coordinates) {
    const { x, y } = coordinates;
    for (let i = squares.length - 1; i >= 0; i--) {
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

  // Corrected logic to split a square on the X-axis
  function splitOnX(square, splitAt) {
    let squareA = {
      x: square.x,
      y: square.y,
      width: splitAt - square.x,
      height: square.height,
    };

    let squareB = {
      x: splitAt,
      y: square.y,
      width: square.width - (splitAt - square.x),
      height: square.height,
    };
    squares.push(squareA);
    squares.push(squareB);
  }

  // Corrected logic to split a square on the Y-axis
  function splitOnY(square, splitAt) {
    let squareA = {
      x: square.x,
      y: square.y,
      width: square.width,
      height: splitAt - square.y,
    };

    let squareB = {
      x: square.x,
      y: splitAt,
      width: square.width,
      height: square.height - (splitAt - square.y),
    };
    squares.push(squareA);
    squares.push(squareB);
  }

  // Apply the splitting logic across the canvas
  for (let i = 0; i < size; i += step) {
    splitSquaresWith({ y: i });
    splitSquaresWith({ x: i });
  }

  // The main drawing function
  function draw() {
    // Randomly assign a color from the palette to some squares
    for (let i = 0; i < colors.length; i++) {
      const randomSquare = squares[Math.floor(Math.random() * squares.length)];
      randomSquare.color = colors[i];
    }

    // Draw each square
    for (let i = 0; i < squares.length; i++) {
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
};
