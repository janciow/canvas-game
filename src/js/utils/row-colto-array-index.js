
export function rowColToArrayIndex(col, row , track) {
  return col + track.TRACK_COLS * row;
}