import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { colorRect } from './GraphicsCommon'

export const track = {
    TRACK_ROAD : 0,
    TRACK_WALL : 1,
    TRACK_PLAYER_START : 2,
    TRACK_GOAL : 3,
    TRACK_TREE : 4,
    TRACK_FLAG : 5,
    TRACK_W : 40,
    TRACK_H : 40,
    TRACK_GAP : 2,
    TRACK_COLS : 20,
    TRACK_ROWS : 15
 }

export const trackGrid = [  1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,
                            1,0,3,0,0, 0,0,0,0,0, 0,0,0,0,1, 4,2,0,0,1,
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

export function isObstacleAtColRow(col, row, track) {
  if (
    col >= 0 &&
    col < track.TRACK_COLS &&
    row >= 0 &&
    row < track.TRACK_ROWS
  ) {
    var trackIndexUnderCoord = rowColToArrayIndex(col, row, track);

    return trackGrid[trackIndexUnderCoord] !== track.TRACK_ROAD;
  } else {
    return false;
  }
}

export function carTrackHandling(track, whichCar) {
  var carTrackCol = Math.floor(whichCar.x / track.TRACK_W);
  var carTrackRow = Math.floor(whichCar.y / track.TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow, track);

  if (
    carTrackCol >= 0 &&
    carTrackCol < track.TRACK_COLS &&
    carTrackRow >= 0 &&
    carTrackRow < track.TRACK_ROWS
  ) {
    if (isObstacleAtColRow(carTrackCol, carTrackRow, track)) {
      whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
      whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
      whichCar.speed *= -0.5;
    }
  }

  return whichCar
}

export function drawTracks(track, canvasContext, trackPics) {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
      var tileKindHere = trackGrid[arrayIndex];
      var useImg = trackPics[tileKindHere];
      canvasContext.drawImage(useImg, drawTileX, drawTileY );
      drawTileX += track.TRACK_W;
      arrayIndex++;
    }
    drawTileY += track.TRACK_H;
    drawTileX = 0;
  }
}
