import {
  trackGrid,
  track,
  drawTracks,
  carTrackHandling
} from './Track';
import player1car from './../img/player1car.png';
import trackRoad from './../img/track_road.png';
import trackWall from './../img/track_wall.png';
import trackGoal from './../img/track_goal.png';
import trackFlag from './../img/track_flag.png';
import trackTree from './../img/track_tree.png';
import { colorRect, colorText } from './GraphicsCommon';
import { carParams, carReset, carMove, carDraw } from './Car';
import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { keyPressed, keyReleased } from './Input';

import {
  carPic,
  wallPic,
  roadPic,
  treePic,
  flagPic,
  goalPic
} from './ImageLoading';

var picsToLoad = 0;

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

function countLoadedImagesAndLauchIfReade() {
  picsToLoad--;
  if (picsToLoad === 0) {
    imageLoadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload = countLoadedImagesAndLauchIfReade;
  imgVar.src = fileName;
}

function loadImages() {
  var imageList = [
    { varName: carPic, theFile: player1car },
    { varName: wallPic, theFile: trackWall },
    { varName: roadPic, theFile: trackRoad },
    { varName: flagPic, theFile: trackFlag },
    { varName: goalPic, theFile: trackGoal },
    { varName: treePic, theFile: trackTree }
  ];

  picsToLoad = imageList.length;

  imageList.forEach(item => {
    beginLoadingImage(item.varName, item.theFile);
  });
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
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  colorRect(0, 0, canvas.width, canvas.height, 'black', canvasContext);
  colorText(
    'LOADING IMAGES',
    canvas.width / 2,
    canvas.height / 2,
    'red',
    canvasContext
  );

  loadImages();
};

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();
  carMovement = carReset(track, trackGrid, carMovement);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  carMovement = carMove(carParams, carMovement, keyHeld);
  carMovement = carTrackHandling(track, carMovement);
}

function drawAll() {
  drawTracks(track, canvasContext, wallPic, roadPic, goalPic, treePic, flagPic );
  carDraw(canvasContext, carMovement, carPic);
}
