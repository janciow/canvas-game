import { trackGrid, track, drawTracks } from './Track';
import player1car from './../img/player1car.png';
import player2car from './../img/player2car.png';
import trackRoad from './../img/track_road.png';
import trackWall from './../img/track_wall.png';
import trackGoal from './../img/track_goal.png';
import trackFlag from './../img/track_flag.png';
import trackTree from './../img/track_tree.png';
import { colorRect, colorText } from './GraphicsCommon';
import { carParams, Car } from './Car';
import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { keyPressed, keyReleased } from './Input';

import { carPic,carPic2 ,trackPics } from './ImageLoading';

var picsToLoad = 0;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

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

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement('img');
  beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
  var imageList = [
    { varName: carPic, theFile: player1car },
    { varName: carPic2, theFile: player2car },
    { trackType: track.TRACK_WALL, theFile: trackWall },
    { trackType: track.TRACK_ROAD, theFile: trackRoad },
    { trackType: track.TRACK_FLAG, theFile: trackFlag },
    { trackType: track.TRACK_GOAL, theFile: trackGoal },
    { trackType: track.TRACK_TREE, theFile: trackTree }
  ];

  picsToLoad = imageList.length;

  imageList.forEach((item, index) => {
    if (item.varName !== undefined) {
      beginLoadingImage(item.varName, item.theFile);
    } else {
      loadImageForTrackCode(item.trackType, item.theFile);
    }
  });
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  greenCar.setupInput(KEY_W,KEY_D,KEY_S, KEY_A)
  blueCar.setupInput(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW, KEY_LEFT_ARROW)

  document.addEventListener('keydown', function() {
    greenCar = keyPressed(event, greenCar);
    blueCar = keyPressed(event, blueCar);
  });
  document.addEventListener('keyup', function() {
    greenCar = keyReleased(event, greenCar);
    blueCar = keyReleased(event, blueCar);
  });
}

function updateMousePos(event) {
  var rectangle = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = event.clientX - rectangle.left - root.scrollLeft;
  mouseY = event.clientY - rectangle.top - root.scrollTop;
}

var blueCar = new Car();
var greenCar = new Car();

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
  greenCar.reset(carPic);
  blueCar.reset(carPic2);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  greenCar.move(carParams);
  blueCar.move(carParams);
}

function drawAll() {
  drawTracks(track, canvasContext, trackPics);
  greenCar.draw(canvasContext);
  blueCar.draw(canvasContext);
}
