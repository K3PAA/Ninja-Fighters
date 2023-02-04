const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

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
      if (p2.health.current <= 0) {
        document.querySelector(`.${eName}-health`).style.width = 0
      } else {
        document.querySelector(`.${eName}-health`).style.width =
          p2.takeHit(p1.basicAttack.dmg) + '%'
      }

      if (p1.ult.current < p1.ult.needed) p1.ult.current += 10
      document.querySelector(`.${pName}-ult`).style.width =
        (p1.ult.current * 70) / p1.ult.needed + '%'

      p1.hitted = true
      p1.canAttack = false
      p1.stamina.current -= 10
    } else {
      p1.stamina.current -= 0.4
    }
    updateStamina({ player: p1, name: pName })
  }
}

export function updateStamina({ player, name }) {
  document.querySelector(`.${name}-stamina`).style.width =
    (player.stamina.current * 60) / player.stamina.max + '%'
}

export function determineWinner({ p1, p2 }) {
  let playerHealth = (p1.health.current * 100) / p1.health.starting
  let enemyHealth = (p2.health.current * 100) / p2.health.starting

  c.font = 'bold 48px verdana, serif'

  c.fillStyle = 'rgba(0,0,0,0.4)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgb(255,255,255)'
  if (playerHealth > enemyHealth) {
    c.fillText('Player Won', canvas.width / 2 - 150, canvas.height / 2 - 50)
    p2.switchSprite('die')
  } else if (playerHealth < enemyHealth) {
    p1.switchSprite('die')
    c.fillText('Enemy Won', canvas.width / 2 - 150, canvas.height / 2 - 50)
  } else {
    c.fillText('Draw', canvas.width / 2 - 65, canvas.height / 2 - 50)
    p1.switchSprite('die')
    p2.switchSprite('die')
  }
}
