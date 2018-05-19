import {
  trackGrid,
  track,
  drawTracks,
  isWallkAtColRow,
  carTrackHandling
} from './Track';
import player1car from './../img/player1car.png';
import { colorRect } from './GraphicsCommon';
import { carParams, carReset, carMove, carDraw } from './Car';
import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { keyPressed, keyReleased } from './Input';

var carPic = document.createElement('img');
var carPicLoaded = false;

var carMovement = {
  carX: 75,
  carY: 75,
  carAng: 0,
  carSpeed: 0
};

var keyHeld = {
  keyHeld_Gas: false,
  keyHeld_Reverse: false,
  keyHeld_TurnLeft: false,
  keyHeld_TurnRight: false
};

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function carImageLoad() {
  carPic.onload = function() {
    carPicLoaded = true;
  };
  carPic.src = player1car;
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', function() {
    keyHeld = keyPressed(event, keyHeld);
  });
  document.addEventListener('keyup', function() {
    keyHeld = keyReleased(event, keyHeld);
  });
}

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

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();
  carImageLoad();
  carMovement = carReset(track, trackGrid, carMovement);
};

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  carMovement = carMove(carParams, carMovement, keyHeld);
  carMovement = carTrackHandling(track, carMovement);
}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, 'black', canvasContext);
}

function drawAll() {
  clearScreen();
  carDraw(canvasContext, carMovement, carPicLoaded, carPic);
  drawTracks(track, canvasContext);
}
