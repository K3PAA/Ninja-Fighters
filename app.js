import {
  rectangularCollision,
  determineDamage,
  updateStamina,
  determineWinner,
} from './scripts/utils.js'
import { fireFighter, groundFighter, background, shop } from './scripts/data.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const player = fireFighter
const enemy = groundFighter
let time = 30

const animate = () => {
  requestAnimationFrame(animate)
  background.draw()
  shop.update()

  if (player.health.current <= 0 || enemy.health.current <= 0 || time === 0) {
    determineWinner({ p1: player, p2: enemy })
  }

  // if (player.isAttacking || true) {
  //   c.fillStyle = 'rgba(0,0,0,0.7)'
  //   c.fillRect(
  //     player.position.x + player.attackBox.offset.x,
  //     player.position.y + player.attackBox.offset.y,
  //     player.attackBox.x,
  //     player.attackBox.y
  //   )
  // }

  // if (enemy.isAttacking || true) {
  //   c.fillStyle = 'rgba(0,0,0,0.3)'
  //   c.fillRect(
  //     enemy.position.x + enemy.attackBox.offset.x,
  //     enemy.position.y + enemy.attackBox.offset.y,
  //     enemy.attackBox.x,
  //     enemy.attackBox.y
  //   )
  // }

  // Checking For Collision X axis
  determineDamage({ p1: player, p2: enemy, pName: 'player', eName: 'enemy' })

  determineDamage({ p1: enemy, p2: player, pName: 'enemy', eName: 'player' })

  if (enemy.isUlting === true) {
    // c.fillStyle = 'rgba(220,0,0,0.7)'
    // c.fillRect(
    //   enemy.position.x + enemy.ultAttackBox.offset.x,
    //   enemy.position.y + enemy.ultAttackBox.offset.y,
    //   enemy.ultAttackBox.x,
    //   enemy.ultAttackBox.y
    // )

    document.querySelector(`.enemy-ult`).style.width = 0

    if (
      player.position.x + player.width >
        enemy.position.x + enemy.ultAttackBox.offset.x &&
      player.position.x <
        enemy.position.x + enemy.ultAttackBox.offset.x + enemy.ultAttackBox.x &&
      player.position.y + player.height >
        enemy.position.y + enemy.attackBox.y &&
      player.position.y < enemy.position.x + enemy.ultAttackBox.y
    ) {
      player.canMove = false
      document.querySelector(`.player-health`).style.width =
        player.takeHit(1) + '%'
      if (player.health.current <= 0) {
        document.querySelector(`.player-health`).style.width = 0 + '%'
      }
    }
  } else player.canMove = true

  if (player.isUlting === true) {
    document.querySelector(`.player-ult`).style.width = 0
    // c.fillStyle = 'rgba(220,0,0,0.7)'
    // c.fillRect(
    //   player.position.x + player.ultAttackBox.offset.x,
    //   player.position.y + player.ultAttackBox.offset.y,
    //   player.ultAttackBox.x,
    //   player.ultAttackBox.y
    // )

    if (
      enemy.position.x + enemy.width >
        player.position.x + player.ultAttackBox.offset.x &&
      enemy.position.x <
        player.position.x +
          player.ultAttackBox.offset.x +
          player.ultAttackBox.x &&
      enemy.position.y + enemy.height >
        player.position.y + player.attackBox.y &&
      enemy.position.y < player.position.x + player.ultAttackBox.y
    ) {
      if (player.currentFrame > 7) {
        if (player.currentFrame < player.sprites.ult.frames - 4) {
          document.querySelector(`.enemy-health`).style.width =
            enemy.takeHit(3) + '%'
        } else {
          document.querySelector(`.enemy-health`).style.width =
            enemy.takeHit(4) + '%'
        }
        if (enemy.health.current <= 0) {
          document.querySelector(`.enemy-health`).style.width = 0 + '%'
        }
      }
    }
  }

  player.update()
  enemy.update()
}

let ManaLoop = undefined

let timerId = undefined

const startButton = document.querySelector('.start-btn')
const lobby = document.querySelector('.lobby')

startButton.addEventListener('click', () => {
  animate()
  lobby.classList.add('off')

  timerId = setInterval(() => {
    time--
    document.querySelector('#timer').innerHTML = time
    if (time === 0) {
      clearInterval(timerId)
      timerId = undefined
    }
  }, 1000)

  ManaLoop = setInterval(() => {
    if (player.stamina.current < player.stamina.max) {
      player.stamina.current += 0.2
      updateStamina({ player, name: 'player' })
    }

    if (enemy.stamina.current < enemy.stamina.max) {
      enemy.stamina.current += 1
      updateStamina({ player: enemy, name: 'enemy' })
    }
  }, 150)
})
