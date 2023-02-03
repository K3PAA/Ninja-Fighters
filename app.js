import {
  rectangularCollision,
  determineDamage,
  updateStamina,
} from './scripts/utils.js'
import { fireFighter, groundFighter, background, shop } from './scripts/data.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const player = fireFighter
const enemy = groundFighter

const animate = () => {
  requestAnimationFrame(animate)
  background.draw()
  shop.update()

  if (player.isAttacking || true) {
    c.fillStyle = 'rgba(0,0,0,0.7)'
    c.fillRect(
      player.position.x + player.attackBox.offset.x,
      player.position.y + player.attackBox.offset.y,
      player.attackBox.x,
      player.attackBox.y
    )
  }

  if (enemy.isAttacking || true) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      enemy.position.x + enemy.attackBox.offset.x,
      enemy.position.y + enemy.attackBox.offset.y,
      enemy.attackBox.x,
      enemy.attackBox.y
    )
  }

  // Checking For Collision X axis
  determineDamage({ p1: player, p2: enemy, pName: 'player', eName: 'enemy' })

  determineDamage({ p1: enemy, p2: player, pName: 'enemy', eName: 'player' })

  if (enemy.isUlting === true || true) {
    c.fillStyle = 'rgba(0,0,120,0.7)'
    c.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height)

    c.fillStyle = 'rgba(0,222,0,0.7)'
    c.fillRect(
      player.position.x,
      player.position.y,
      player.width,
      player.height
    )

    // if (
    //   player.position.x + player.width >
    //   enemy.position.x + enemy.ultAttackBox.offset.x + enemy.ultAttackBox.x
    // ) {
    //   console.log('e')
    // } else
    //   console.log(
    //     enemy.position.x - enemy.ultAttackBox.offset.x + enemy.ultAttackBox.x,
    //     player.position.x + player.width
    //   )
  }

  if (player.isUlting === true) {
    c.fillStyle = 'rgba(220,0,0,0.7)'
    c.fillRect(
      player.position.x + player.ultAttackBox.offset.x,
      player.position.y + player.ultAttackBox.offset.y,
      player.ultAttackBox.x,
      player.ultAttackBox.y
    )
  }

  player.update()
  enemy.update()
}

animate()

let ManaLoop = undefined

ManaLoop = setInterval(() => {
  if (player.stamina.current < player.stamina.max) {
    player.stamina.current += 1
    updateStamina({ player, name: 'player' })
  }

  if (enemy.stamina.current < enemy.stamina.max) {
    enemy.stamina.current += 1
    updateStamina({ player: enemy, name: 'enemy' })
  }
}, 150)
