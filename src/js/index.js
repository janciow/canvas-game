import { trackGrid } from './grid';
import player1car from './../img/player1car.png';

(function() {
  var carPic = document.createElement('img');
  var carPicLoaded = false;

  var carX = 75;
  var carY = 75;
  var carAng = 0;
  var carSpeed = 0;

  const TRACK_W = 40;
  const TRACK_H = 40;
  const TRACK_GAP = 2;
  const TRACK_COLS = 20;
  const TRACK_ROWS = 15;

  var canvas, canvasContext;

  const KEY_LEFT_ARROW = 37;
  const KEY_UP_ARROW = 38;
  const KEY_RIGHT_ARROW = 39;
  const KEY_DOWN_ARROW = 40;

  const GROUNDSPEED_DECAY_MULT = 0.94;
  const DRIVE_POWER = 0.5;
  const REVERSE_POWER = 0.2;
  const TURN_RATE = 0.03;

  var keyHeld_Gas = false;
  var keyHeld_Reverse = false;
  var keyHeld_TurnLeft = false;
  var keyHeld_TurnRight = false;

  var mouseX = 0;
  var mouseY = 0;

  function updateMousePos(event) {
    var rectangle = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = event.clientX - rectangle.left - root.scrollLeft;
    mouseY = event.clientY - rectangle.top - root.scrollTop;

    // carX = mouseX;
    // carY = mouseY;
    // carSpeedX = 3;
    // carSpeedY = -4;
  }

  function keyPressed(event) {
    if (event.keyCode === KEY_LEFT_ARROW) {
      keyHeld_TurnLeft = true;
    }

    if (event.keyCode === KEY_RIGHT_ARROW) {
      keyHeld_TurnRight = true;
    }

    if (event.keyCode === KEY_UP_ARROW) {
      keyHeld_Gas = true;
    }

    if (event.keyCode === KEY_DOWN_ARROW) {
      keyHeld_Reverse = true;
    }
    event.preventDefault();
  }

  function keyReleased(event) {
    if (event.keyCode === KEY_LEFT_ARROW) {
      keyHeld_TurnLeft = false;
    }

    if (event.keyCode === KEY_RIGHT_ARROW) {
      keyHeld_TurnRight = false;
    }

    if (event.keyCode === KEY_UP_ARROW) {
      keyHeld_Gas = false;
    }

    if (event.keyCode === KEY_DOWN_ARROW) {
      keyHeld_Reverse = false;
    }
    event.preventDefault();
  }

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;

    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    carPic.onload = function() {
      carPicLoaded = true;
    };
    carPic.src = player1car;

    carReset();
  };

  function updateAll() {
    moveAll();
    drawAll();
  }

  function carReset() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

        if (trackGrid[arrayIndex] === 2) {
          trackGrid[arrayIndex] = 0;
          carAng = Math.PI / 2;
          carX = eachCol * TRACK_W + TRACK_W / 2;
          carY = eachRow * TRACK_H + TRACK_H / 2;
        }
      }
    }
  }

  function carMove() {
    carSpeed *= GROUNDSPEED_DECAY_MULT;

    if (keyHeld_Gas) {
      carSpeed += DRIVE_POWER;
    }
    if (keyHeld_Reverse) {
      carSpeed -= REVERSE_POWER;
    }
    if (keyHeld_TurnLeft) {
      carAng -= TURN_RATE;
    }
    if (keyHeld_TurnRight) {
      carAng += TURN_RATE;
    }

    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;

    if (carX > canvas.width && carSpeedX > 0.0) {
      carSpeedX *= -1;
    } else if (carX < 0 && carSpeedX < 0.0) {
      carSpeedX *= -1;
    } else if (carY < 0 && carSpeedY < 0.0) {
      carSpeedY *= -1;
    } else if (carY > canvas.height) {
      carReset();
    }
  }

  function isTrackAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
      var trackIndexUnderCoord = rowColToArrayIndex(col, row);

      return trackGrid[trackIndexUnderCoord] === 1;
    } else {
      return false;
    }
  }

  function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if (
      carTrackCol >= 0 &&
      carTrackCol < TRACK_COLS &&
      carTrackRow >= 0 &&
      carTrackRow < TRACK_ROWS
    ) {
      if (isTrackAtColRow(carTrackCol, carTrackRow)) {
        carX -= Math.cos(carAng) * carSpeed;
        carY -= Math.sin(carAng) * carSpeed;
        carSpeed *= -0.5;
      }
    }
  }

  function moveAll() {
    carMove();
    carTrackHandling();
  }

  function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
  }

  function drawTracks() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

        if (trackGrid[arrayIndex] === 1) {
          colorRect(
            TRACK_W * eachCol,
            TRACK_H * eachRow,
            TRACK_W - TRACK_GAP,
            TRACK_H - TRACK_GAP,
            'blue'
          );
        }
      }
    }
  }

  function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if (carPicLoaded) {
      drawBitmapCentredWithRotation(carPic, carX, carY, carAng);
    }
    drawTracks();
  }

  function drawBitmapCentredWithRotation(useBitmap, atX, atY, widthAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(widthAng);
    canvasContext.drawImage(
      useBitmap,
      -useBitmap.width / 2,
      -useBitmap.height / 2
    );
    canvasContext.restore();
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
