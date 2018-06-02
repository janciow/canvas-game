import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { trackGrid, carTrackHandling, track } from './Track';
import { drawBitmapCentredWithRotation } from './GraphicsCommon';

export const carParams = {
  GROUNDSPEED_DECAY_MULT: 0.94,
  DRIVE_POWER: 0.5,
  REVERSE_POWER: 0.2,
  TURN_RATE: 0.06,
  MIN_SPEED_TO_TURN: 0
};

export class Car {
  constructor() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myCarPic;

    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;
  }

  setupInput(upKey, rightKey, downKey, leftKey) {
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  }

  reset(whichImage) {
    this.myCarPic = whichImage;
    for (var eachRow = 0; eachRow < track.TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < track.TRACK_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow, track);

        if (trackGrid[arrayIndex] === track.TRACK_PLAYER_START) {
          trackGrid[arrayIndex] = track.TRACK_ROAD;
          this.ang = Math.PI / 2;
          this.x = eachCol * track.TRACK_W + track.TRACK_W / 2;
          this.y = eachRow * track.TRACK_H + track.TRACK_H / 2;
          return;
        }
      }
    }
  };

  move(carParams) {
    this.speed *= carParams.GROUNDSPEED_DECAY_MULT;

    if (this.keyHeld_Gas) {
      this.speed += carParams.DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.speed -= carParams.REVERSE_POWER;
    }

    if (Math.abs(this.speed) > carParams.MIN_SPEED_TO_TURN) {
      if (this.keyHeld_TurnLeft) {
        this.ang -= carParams.TURN_RATE;
      }
      if (this.keyHeld_TurnRight) {
        this.ang += carParams.TURN_RATE;
      }
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(track, this)
  }

  draw(canvasContext) {
    drawBitmapCentredWithRotation(
      this.myCarPic,
      this.x,
      this.y,
      this.ang,
      canvasContext
    );
  }
}
