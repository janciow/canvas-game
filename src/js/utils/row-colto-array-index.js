
export function rowColToArrayIndex(col, row , World) {
  return col + World.World_COLS * row;
}