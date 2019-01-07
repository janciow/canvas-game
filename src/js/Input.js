function keySet(event, setTo, whichWarrior) {
  if (event.keyCode === whichWarrior.controlKeyLeft) {
    whichWarrior.keyHeld_TurnLeft = setTo;
  }

  if (event.keyCode === whichWarrior.controlKeyRight) {
    whichWarrior.keyHeld_TurnRight = setTo;
  }

  if (event.keyCode === whichWarrior.controlKeyUp) {
    whichWarrior.keyHeld_Gas = setTo;
  }

  if (event.keyCode === whichWarrior.controlKeyDown) {
    whichWarrior.keyHeld_Reverse = setTo;
  }
  return whichWarrior;
}


export function keyPressed(event, whichWarrior) {
  whichWarrior = keySet(event, true, whichWarrior) 
  event.preventDefault();
  return whichWarrior;
}

export function keyReleased(event, whichWarrior) {
  whichWarrior = keySet(event, false, whichWarrior) 
  event.preventDefault();
  return whichWarrior;
}
