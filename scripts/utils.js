export function rectangularCollision({ rect1, rect2 }) {
  if (
    (rect1.position.x + rect1.attackBox.x > rect2.position.x &&
      rect1.position.x < rect2.position.x + rect2.width &&
      rect1.dir === 1 &&
      rect1.canAttack) ||
    (rect1.position.x - rect1.attackBox.x < rect2.position.x + rect2.width &&
      rect1.position.x > rect2.position.x + rect2.width &&
      rect1.dir === -1 &&
      rect1.canAttack)
  ) {
    // Checking For Collision Y axis
    if (
      rect1.position.y + rect1.attackBox.y < rect2.position.y + rect2.height &&
      rect1.position.y + rect1.attackBox.y > rect2.position.y
    ) {
      return true
    }
  }
}

export function determineDamage({ p1, p2, pName, eName }) {
  if (p1.canAttack && p1.stamina.current > 0) {
    if (rectangularCollision({ rect1: p1, rect2: p2 })) {
      document.querySelector(`.${eName}-health`).style.width =
        p2.takeHit(p1.basicAttack.dmg) + '%'
      if (p1.ult.current < p1.ult.needed) p1.ult.current += 10
      document.querySelector(`.${pName}-ult`).style.width =
        (p1.ult.current * 70) / p1.ult.needed + '%'
      if (p2.health.current === 0) console.log(`${pName}Won`)
      p1.hitted = true
      p1.canAttack = false
      p1.stamina.current -= 10
    } else {
      p1.stamina.current -= 0.4
    }
    updateStamina({ player: p1, name: pName })
  }
}

export function trapInUlt() {}
export function updateStamina({ player, name }) {
  document.querySelector(`.${name}-stamina`).style.width =
    (player.stamina.current * 60) / player.stamina.max + '%'
}
