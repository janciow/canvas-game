import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { trackGrid } from './Track';
import { drawBitmapCentredWithRotation } from './GraphicsCommon';

export const carParams = {
  GROUNDSPEED_DECAY_MULT: 0.94,
  DRIVE_POWER: 0.5,
  REVERSE_POWER: 0.2,
  TURN_RATE: 0.03
};

export var carPic = document.createElement('img');
export var carPicLoaded = false;

export function carReset(track, trackGrid, carMovement) {
  for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
      var arrayIndex = rowColToArrayIndex(eachCol, eachRow, track);

      if (trackGrid[arrayIndex] === track.TRACK_PLAYER_START) {
        trackGrid[arrayIndex] = track.TRACK_ROAD;
        carMovement.carAng = Math.PI / 2;
        carMovement.carX = eachCol * track.TRACK_W + track.TRACK_W / 2;
        carMovement.carY = eachRow * track.TRACK_H + track.TRACK_H / 2;
      }
    }
  }
  return carMovement;
}

export function carMove(carParams, carMovement, keyHeld) {
  carMovement.carSpeed *= carParams.GROUNDSPEED_DECAY_MULT;

  if (keyHeld.keyHeld_Gas) {
    carMovement.carSpeed += carParams.DRIVE_POWER;
  }
  if (keyHeld.keyHeld_Reverse) {
    carMovement.carSpeed -= carParams.REVERSE_POWER;
  }
  if (keyHeld.keyHeld_TurnLeft) {
    carMovement.carAng -= carParams.TURN_RATE;
  }
  if (keyHeld.keyHeld_TurnRight) {
    carMovement.carAng += carParams.TURN_RATE;
  }

  carMovement.carX += Math.cos(carMovement.carAng) * carMovement.carSpeed;
  carMovement.carY += Math.sin(carMovement.carAng) * carMovement.carSpeed;

  return carMovement;
}

export function carDraw(canvasContext, carMovement, carPic) {
    drawBitmapCentredWithRotation(
      carPic,
      carMovement.carX,
      carMovement.carY,
      carMovement.carAng,
      canvasContext
    );
}
