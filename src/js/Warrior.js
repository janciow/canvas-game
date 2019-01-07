import { rowColToArrayIndex } from './utils/row-colto-array-index';
import { WorldGrid, WarriorWorldHandling, World } from './World';
import { drawBitmapCentredWithRotation } from './GraphicsCommon';

export const WarriorParams = {
  GROUNDSPEED_DECAY_MULT: 0.94,
  DRIVE_POWER: 0.5,
  REVERSE_POWER: 0.2,
  TURN_RATE: 0.06,
  MIN_SPEED_TO_TURN: 0
};

export class Warrior {
  constructor() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.myWarriorPic;

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
    this.myWarriorPic = whichImage;
    for (var eachRow = 0; eachRow < World.World_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < World.World_COLS; eachCol++) {
        var arrayIndex = rowColToArrayIndex(eachCol, eachRow, World);

        if (WorldGrid[arrayIndex] === World.World_PLAYER_START) {
          WorldGrid[arrayIndex] = World.World_ROAD;
          this.ang = Math.PI / 2;
          this.x = eachCol * World.World_W + World.World_W / 2;
          this.y = eachRow * World.World_H + World.World_H / 2;
          return;
        }
      }
    }
  };

  move(WarriorParams) {
    this.speed *= WarriorParams.GROUNDSPEED_DECAY_MULT;

    if (this.keyHeld_Gas) {
      this.speed += WarriorParams.DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.speed -= WarriorParams.REVERSE_POWER;
    }

    if (Math.abs(this.speed) > WarriorParams.MIN_SPEED_TO_TURN) {
      if (this.keyHeld_TurnLeft) {
        this.ang -= WarriorParams.TURN_RATE;
      }
      if (this.keyHeld_TurnRight) {
        this.ang += WarriorParams.TURN_RATE;
      }
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    WarriorWorldHandling(World, this)
  }

  draw(canvasContext) {
    drawBitmapCentredWithRotation(
      this.myWarriorPic,
      this.x,
      this.y,
      this.ang,
      canvasContext
    );
  }
}
