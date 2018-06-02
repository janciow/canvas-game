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

export function carTrackHandling(track, carMovement) {
  var carTrackCol = Math.floor(carMovement.carX / track.TRACK_W);
  var carTrackRow = Math.floor(carMovement.carY / track.TRACK_H);
  var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow, track);

  if (
    carTrackCol >= 0 &&
    carTrackCol < track.TRACK_COLS &&
    carTrackRow >= 0 &&
    carTrackRow < track.TRACK_ROWS
  ) {
    if (isObstacleAtColRow(carTrackCol, carTrackRow, track)) {
      carMovement.carX -= Math.cos(carMovement.carAng) * carMovement.carSpeed;
      carMovement.carY -= Math.sin(carMovement.carAng) * carMovement.carSpeed;
      carMovement.carSpeed *= -0.5;
    }
  }
  return carMovement;
}

export function drawTracks(track, canvasContext, ...pic) {
  for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow, track);
      var tileKindHere = trackGrid[arrayIndex];
      var useImg;


      switch(tileKindHere) {
        case track.TRACK_ROAD:
          useImg = pic[1]
          break;
        case track.TRACK_WALL: 
          useImg = pic[0]
          break;
          case track.TRACK_GOAL:
          useImg = pic[2]
          break;
        case track.TRACK_TREE: 
          useImg = pic[3]
          break;
          case track.TRACK_FLAG:
          useImg = pic[4]
          break;
      }

      canvasContext.drawImage(useImg, track.TRACK_W * eachCol, track.TRACK_H * eachRow );
    }
  }
}
