const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

export function keyPressed(event, keyHeld) {
  if (event.keyCode === KEY_LEFT_ARROW) {
    keyHeld.keyHeld_TurnLeft = true;
  }

  if (event.keyCode === KEY_RIGHT_ARROW) {
    keyHeld.keyHeld_TurnRight = true;
  }

  if (event.keyCode === KEY_UP_ARROW) {
    keyHeld.keyHeld_Gas = true;
  }

  if (event.keyCode === KEY_DOWN_ARROW) {
    keyHeld.keyHeld_Reverse = true;
  }
  event.preventDefault();

  return keyHeld;
}

export function keyReleased(event, keyHeld) {
  if (event.keyCode === KEY_LEFT_ARROW) {
    keyHeld.keyHeld_TurnLeft = false;
  }

  if (event.keyCode === KEY_RIGHT_ARROW) {
    keyHeld.keyHeld_TurnRight = false;
  }

  if (event.keyCode === KEY_UP_ARROW) {
    keyHeld.keyHeld_Gas = false;
  }

  if (event.keyCode === KEY_DOWN_ARROW) {
    keyHeld.keyHeld_Reverse = false;
  }
  event.preventDefault();
  return keyHeld;
}
