function keySet(event, setTo, whichCar) {
  if (event.keyCode === whichCar.controlKeyLeft) {
    whichCar.keyHeld_TurnLeft = setTo;
  }

  if (event.keyCode === whichCar.controlKeyRight) {
    whichCar.keyHeld_TurnRight = setTo;
  }

  if (event.keyCode === whichCar.controlKeyUp) {
    whichCar.keyHeld_Gas = setTo;
  }

  if (event.keyCode === whichCar.controlKeyDown) {
    whichCar.keyHeld_Reverse = setTo;
  }
  return whichCar;
}


export function keyPressed(event, whichCar) {
  whichCar = keySet(event, true, whichCar) 
  event.preventDefault();
  return whichCar;
}

export function keyReleased(event, whichCar) {
  whichCar = keySet(event, false, whichCar) 
  event.preventDefault();
  return whichCar;
}
