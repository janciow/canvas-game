import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { colorRect } from './GraphicsCommon'

export const World = {
    World_ROAD : 0,
    World_WALL : 1,
    World_PLAYER_START : 2,
    World_GOAL : 3,
    World_TREE : 4,
    World_FLAG : 5,
    World_W : 40,
    World_H : 40,
    World_GAP : 2,
    World_COLS : 20,
    World_ROWS : 15
 }

export const WorldGrid = [  1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,
                            1,0,3,0,0, 0,0,0,0,0, 0,0,0,0,1, 4,2,2,0,1,
                            1,0,3,0,0, 0,0,0,0,0, 0,0,0,0,1, 4,0,0,0,1,
                            1,4,1,1,1, 1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1,
                            1,1,1,0,0, 1,4,4,0,1, 0,0,0,0,0, 1,0,0,0,1,

                            1,0,0,0,0, 0,0,0,0,5, 0,0,0,0,1, 1,0,0,0,1,
                            1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1, 1,0,0,0,1,
                            1,0,0,5,0, 0,0,0,0,0, 0,0,0,0,1, 1,0,0,0,1,
                            1,0,0,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,0,0,0,1,
                            1,0,0,0,0, 1,0,0,0,0, 0,0,0,0,1, 1,0,0,0,1,

                            1,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,1,
                            1,0,0,0,0, 5,0,0,0,5, 0,0,0,0,0, 5,0,0,0,1,
                            1,0,0,0,0, 0,0,0,0,1, 0,0,0,0,0, 0,0,0,0,1,
                            1,0,0,0,0, 0,0,0,0,1, 1,0,0,0,0, 0,0,0,0,1,
                            1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,
];

export function isObstacleAtColRow(col, row, World) {
  if (
    col >= 0 &&
    col < World.World_COLS &&
    row >= 0 &&
    row < World.World_ROWS
  ) {
    var WorldIndexUnderCoord = rowColToArrayIndex(col, row, World);

    return WorldGrid[WorldIndexUnderCoord] !== World.World_ROAD;
  } else {
    return false;
  }
}

export function WarriorWorldHandling(World, whichWarrior) {
  var WarriorWorldCol = Math.floor(whichWarrior.x / World.World_W);
  var WarriorWorldRow = Math.floor(whichWarrior.y / World.World_H);
  var WorldIndexUnderWarrior = rowColToArrayIndex(WarriorWorldCol, WarriorWorldRow, World);

  if (
    WarriorWorldCol >= 0 &&
    WarriorWorldCol < World.World_COLS &&
    WarriorWorldRow >= 0 &&
    WarriorWorldRow < World.World_ROWS
  ) {
    if (isObstacleAtColRow(WarriorWorldCol, WarriorWorldRow, World)) {
      whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
      whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;
      whichWarrior.speed *= -0.5;
    }
  }
}

export function drawWorlds(World, canvasContext, WorldPics) {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for (var eachRow = 0; eachRow < World.World_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < World.World_COLS; eachCol++) {
      var tileKindHere = WorldGrid[arrayIndex];
      var useImg = WorldPics[tileKindHere];
      canvasContext.drawImage(useImg, drawTileX, drawTileY );
      drawTileX += World.World_W;
      arrayIndex++;
    }
    drawTileY += World.World_H;
    drawTileX = 0;
  }
}
