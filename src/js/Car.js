import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { trackGrid } from './Track';
import { drawBitmapCentredWithRotation } from './GraphicsCommon';

export const carParams = {
  GROUNDSPEED_DECAY_MULT: 0.94,
  DRIVE_POWER: 0.5,
  REVERSE_POWER: 0.2,
  TURN_RATE: 0.06,
  MIN_SPEED_TO_TURN: 0.5
};

export function Car() {
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  this.speed = 0;

  this.reset = function(track, trackGrid) {
    for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow, track);

        if (trackGrid[arrayIndex] === track.TRACK_PLAYER_START) {
          trackGrid[arrayIndex] = track.TRACK_ROAD;
          this.ang = Math.PI / 2;
          this.x = eachCol * track.TRACK_W + track.TRACK_W / 2;
          this.y = eachRow * track.TRACK_H + track.TRACK_H / 2;
        }
      }
    }
  };

  this.move = function(carParams, keyHeld) {
    this.speed *= carParams.GROUNDSPEED_DECAY_MULT;

    if (keyHeld.keyHeld_Gas) {
      this.speed += carParams.DRIVE_POWER;
    }
    if (keyHeld.keyHeld_Reverse) {
      this.speed -= carParams.REVERSE_POWER;
    }

    if (Math.abs(this.speed) > carParams.MIN_SPEED_TO_TURN) {
      if (keyHeld.keyHeld_TurnLeft) {
        this.ang -= carParams.TURN_RATE;
      }
      if (keyHeld.keyHeld_TurnRight) {
        this.ang += carParams.TURN_RATE;
      }
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;
  }

  this.draw = function(canvasContext, carPic) {
    drawBitmapCentredWithRotation(
      carPic,
      this.x,
      this.y,
      this.ang,
      canvasContext
    );
  }
}
