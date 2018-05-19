export function drawBitmapCentredWithRotation(useBitmap, atX, atY, widthAng, canvasContext) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(widthAng);
  canvasContext.drawImage(
    useBitmap,
    -useBitmap.width / 2,
    -useBitmap.height / 2
  );
  canvasContext.restore();
}

export function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, canvasContext) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

export function colorCircle(centerX, centerY, radius, fillColor, canvasContext) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

export function colorText(showWords, textX, textY, fillColor, canvasContext) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
