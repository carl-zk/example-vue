interface Position {
  x: number,
  y: number
}

function moveTo(pos: Position, distX: number, distY: number): void {
  pos.x = distX
  pos.y = distY
}

function moveBy(pos: Position, dx: number, dy: number): void {
  pos.x += dx
  pos.y += dy
}

export { Position, moveTo, moveBy } 