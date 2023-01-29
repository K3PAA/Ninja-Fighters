import Player from './scripts/Player.js'
import { rectangularCollision } from './scripts/utils.js'
import { fireFighter, groundFighter } from './scripts/data.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const player = fireFighter

const enemy = groundFighter

const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = 'green'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (player.isAttacking) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      player.position.x + player.attackBox.offset.x,
      player.position.y + player.attackBox.offset.y,
      player.attackBox.x,
      player.attackBox.y
    )
  }

  if (enemy.isAttacking) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      enemy.position.x + enemy.attackBox.offset.x,
      enemy.position.y + enemy.attackBox.offset.y,
      enemy.attackBox.x,
      enemy.attackBox.y
    )
  }

  // Checking For Collision X axis
  if (rectangularCollision({ rect1: player, rect2: enemy })) {
    enemy.takeHit()
    player.isAttacking = false

    setTimeout(() => (player.canAttack = true), 300)
  } else {
    player.isAttacking = false
    setTimeout(() => (player.canAttack = true), 300)
  }
  if (rectangularCollision({ rect1: enemy, rect2: player })) {
    player.takeHit()
    enemy.isAttacking = false

    setTimeout(() => (enemy.canAttack = true), 300)
  } else {
    enemy.isAttacking = false
    setTimeout(() => (enemy.canAttack = true), 300)
  }

  player.update()
  enemy.update()
}

animate()
