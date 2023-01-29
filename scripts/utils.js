export function rectangularCollision({ rect1, rect2 }) {
  if (
    (rect1.position.x + rect1.attackBox.x > rect2.position.x &&
      rect1.position.x < rect2.position.x + rect2.width &&
      rect1.dir === 1 &&
      rect1.isAttacking) ||
    (rect1.position.x - rect1.attackBox.x < rect2.position.x + rect2.width &&
      rect1.position.x > rect2.position.x + rect2.width &&
      rect1.dir === -1 &&
      rect1.isAttacking)
  ) {
    // Checking For Collision Y axis
    if (
      rect1.position.y + rect1.attackBox.y < rect2.position.y + rect2.height &&
      rect1.position.y + rect1.attackBox.offset.y > rect2.position.y
    ) {
      return true
    }
  }
}
