(function() {
  var ballX = 75;
  var ballY = 100;
  var ballSpeedX = 5;
  var ballSpeedY = 5;

  const BRICK_W = 80;
  const BRICK_H = 20;
  const BRICK_COLS = 10;
  const BRICK_GAP = 2;
  const BRICK_ROWS = 14;

  var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
  var brickLeft = 0;

  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 20;
  const PADDLE_DIST_FROM_EDGE = 60;
  var paddleX = 400;

  var canvas, canvasContext;

  var mouseX = 0;
  var mouseY = 0;

  function updateMousePos(event) {
    var rectangle = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = event.clientX - rectangle.left - root.scrollLeft;
    mouseY = event.clientY - rectangle.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH / 2;
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 3;
    // ballSpeedY = -4;
  }

  function brickReset() {
    brickLeft = 0;
    var i;
    for (i = 0; i < 3 * BRICK_COLS; i++) {
      brickGrid[i] = false;
    }
    for (; i < BRICK_COLS * BRICK_ROWS; i++) {
      brickGrid[i] = true;
      brickLeft++;
    }
  }

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;

    setInterval(updateAll, 1000 / framesPerSecond);
    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
    ballReset();
  };

  function updateAll() {
    moveAll();
    drawAll();
  }

  function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width && ballSpeedX > 0.0) {
      ballSpeedX *= -1;
    } else if (ballX < 0 && ballSpeedX < 0.0) {
      ballSpeedX *= -1;
    } else if (ballY < 0 && ballSpeedY < 0.0) {
      ballSpeedY *= -1;
    } else if (ballY > canvas.height) {
      ballReset();
      brickReset();
    }
  }

  function isBrickAtColRow(col, row) {
    if (col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
      var brickIndexUnderCoord = rowColToArrayIndex(col, row);

      return brickGrid[brickIndexUnderCoord];
    } else {
      return false;
    }
  }

  function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);

    if (
      ballBrickCol >= 0 &&
      ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 &&
      ballBrickRow < BRICK_ROWS
    ) {
      if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
        brickGrid[brickIndexUnderBall] = false;
        brickLeft--;

        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevBrickCol = Math.floor(prevBallX / BRICK_W);
        var prevBrickRow = Math.floor(prevBallY / BRICK_H);

        var bothTestsFailed = true;
        if (prevBrickCol != ballBrickCol) {
          if (isBrickAtColRow(prevBrickCol, ballBrickRow) === false) {
            ballSpeedX *= -1;
            bothTestsFailed = false;
          }
        }

        if (prevBrickRow != ballBrickRow) {
          if (isBrickAtColRow(ballBrickCol, prevBrickRow) === false) {
            ballSpeedY *= -1;
            bothTestsFailed = false;
          }
        }

        if (bothTestsFailed) {
          ballSpeedY *= -1;
          ballSpeedX *= -1;
        }
      }
    }
  }

  function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleX + PADDLE_WIDTH;

    if (
      ballY > paddleTopEdgeY &&
      ballY < paddleBottomEdgeY &&
      ballX > paddleLeftEdgeX &&
      ballX < paddleRightEdgeX
    ) {
      ballSpeedY *= -1;
      var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
      var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistFromPaddleCenterX * 0.35;

      if (brickLeft == 0) {
        brickReset();
      }
    }
  }

  function moveAll() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
  }

  function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
  }

  function drawBricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

        if (brickGrid[arrayIndex]) {
          colorRect(
            BRICK_W * eachCol,
            BRICK_H * eachRow,
            BRICK_W - BRICK_GAP,
            BRICK_H - BRICK_GAP,
            'blue'
          );
        }
      }
    }
  }

  function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    colorCircle(ballX, ballY, 10, 'white');
    colorRect(
      paddleX,
      canvas.height - PADDLE_DIST_FROM_EDGE,
      PADDLE_WIDTH,
      PADDLE_THICKNESS,
      'white'
    );

    drawBricks();
  }

  function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }

  function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
  }

  function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
  }
})();
