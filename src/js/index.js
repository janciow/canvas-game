import { WorldGrid, World, drawWorlds } from './World';
import player1Warrior from './../img/player1Warrior.png';
import player2Warrior from './../img/player2Warrior.png';
import WorldRoad from './../img/World_road.png';
import WorldWall from './../img/World_wall.png';
import WorldGoal from './../img/World_goal.png';
import WorldFlag from './../img/World_flag.png';
import WorldTree from './../img/World_tree.png';
import { colorRect, colorText } from './GraphicsCommon';
import { WarriorParams, Warrior } from './Warrior';
import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { keyPressed, keyReleased } from './Input';

import { WarriorPic,WarriorPic2 ,WorldPics } from './ImageLoading';

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

function loadImageForWorldCode(WorldCode, fileName) {
  WorldPics[WorldCode] = document.createElement('img');
  beginLoadingImage(WorldPics[WorldCode], fileName);
}

function loadImages() {
  var imageList = [
    { varName: WarriorPic, theFile: player1Warrior },
    { varName: WarriorPic2, theFile: player2Warrior },
    { WorldType: World.World_WALL, theFile: WorldWall },
    { WorldType: World.World_ROAD, theFile: WorldRoad },
    { WorldType: World.World_FLAG, theFile: WorldFlag },
    { WorldType: World.World_GOAL, theFile: WorldGoal },
    { WorldType: World.World_TREE, theFile: WorldTree }
  ];

  picsToLoad = imageList.length;

  imageList.forEach((item, index) => {
    if (item.varName !== undefined) {
      beginLoadingImage(item.varName, item.theFile);
    } else {
      loadImageForWorldCode(item.WorldType, item.theFile);
    }
  });
}

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  greenWarrior.setupInput(KEY_W,KEY_D,KEY_S, KEY_A)
  blueWarrior.setupInput(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW, KEY_LEFT_ARROW)

  document.addEventListener('keydown', function() {
    greenWarrior = keyPressed(event, greenWarrior);
    blueWarrior = keyPressed(event, blueWarrior);
  });
  document.addEventListener('keyup', function() {
    greenWarrior = keyReleased(event, greenWarrior);
    blueWarrior = keyReleased(event, blueWarrior);
  });
}

function updateMousePos(event) {
  var rectangle = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = event.clientX - rectangle.left - root.scrollLeft;
  mouseY = event.clientY - rectangle.top - root.scrollTop;
}

var blueWarrior = new Warrior();
var greenWarrior = new Warrior();

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
  greenWarrior.reset(WarriorPic);
  blueWarrior.reset(WarriorPic2);
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  greenWarrior.move(WarriorParams);
  blueWarrior.move(WarriorParams);
}

function drawAll() {
  drawWorlds(World, canvasContext, WorldPics);
  greenWarrior.draw(canvasContext);
  blueWarrior.draw(canvasContext);
}
