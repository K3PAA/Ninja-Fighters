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
  c.fillStyle = 'rgba(120,40,70,1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  if (player.isAttacking) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      player.position.x + player.attackBox.offset.x,
      player.position.y + player.attackBox.offset.y,
      player.attackBox.x,
      player.attackBox.y
    )
    document.querySelector('.player-stamina').style.width =
      (player.stamina.current * 60) / player.stamina.max + '%'
  }

  if (enemy.isAttacking) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      enemy.position.x + enemy.attackBox.offset.x,
      enemy.position.y + enemy.attackBox.offset.y,
      enemy.attackBox.x,
      enemy.attackBox.y
    )

    document.querySelector('.enemy-stamina').style.width =
      (enemy.stamina.current * 60) / enemy.stamina.max + '%'
  }

  // Checking For Collision X axis
  if (rectangularCollision({ rect1: player, rect2: enemy })) {
    document.querySelector('.enemy-health').style.width = enemy.takeHit() + '%'
    if (player.ult.current < 70) player.ult.current += 10
    document.querySelector('.player-ult').style.width = player.ult.current + '%'

    if (enemy.health.current === 0) console.log('Fire Knight Won')
    player.isAttacking = false

    setTimeout(() => (player.canAttack = true), 300)
  } else {
    player.isAttacking = false
    setTimeout(() => (player.canAttack = true), 300)
  }
  if (rectangularCollision({ rect1: enemy, rect2: player })) {
    document.querySelector('.player-health').style.width =
      player.takeHit() + '%'

    if (enemy.ult.current < 70) enemy.ult.current += 10
    document.querySelector('.enemy-ult').style.width = enemy.ult.current + '%'

    if (player.health.current === 0) console.log('Bold Seen Won')
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
