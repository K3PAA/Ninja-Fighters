import {
  rectangularCollision,
  determineDamage,
  updateStamina,
  determineWinner,
  resetOthers,
} from './scripts/utils.js'
import { fireFighter, groundFighter, background, shop } from './scripts/data.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let player = fireFighter
let enemy = groundFighter
let time = 30
let bg = background
let sh = shop

const animate = () => {
  requestAnimationFrame(animate)
  bg.draw()
  sh.update()

  if (player.health.current <= 0 || enemy.health.current <= 0 || time === 0) {
    determineWinner({ p1: player, p2: enemy })

    clearInterval(ManaLoop)
    clearInterval(timerId)
    timerId = undefined
    ManaLoop = undefined
  }

  determineDamage({ p1: player, p2: enemy, pName: 'player', eName: 'enemy' })

  determineDamage({ p1: enemy, p2: player, pName: 'enemy', eName: 'player' })

  if (enemy.isUlting === true) {
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
  lobby.classList.add('off')
  initialValues()
  document.querySelector('#timer').innerHTML = time
  timerId = setInterval(oneSecondLoop, 1000)
  ManaLoop = setInterval(manaRefreshLoop, 150)
})

const resetBtn = document.querySelector('.btn-restart')

const oneSecondLoop = () => {
  time--
  document.querySelector('#timer').innerHTML = time
  if (time === 0) {
    clearInterval(timerId)
    timerId = undefined
  }
}

const manaRefreshLoop = () => {
  if (player.stamina.current < player.stamina.max) {
    player.stamina.current += 0.5
    updateStamina({ player, name: 'player' })
  }

  if (enemy.stamina.current < enemy.stamina.max) {
    enemy.stamina.current += 1
    updateStamina({ player: enemy, name: 'enemy' })
  }
}

const resetValues = (po) => {
  po.position.x = po.position.starting.x
  po.position.y = po.position.starting.y

  po.isDead = false
  po.canAnimate = true
  po.pose = po.sprites.idle.number
  po.maxFrames = po.sprites.idle.frames
  po.currentFrame = 0
  po.stamina.current = po.stamina.max
  po.health.current = po.health.starting
}

const initialValues = () => {
  player = fireFighter
  enemy = groundFighter
  time = 30

  resetValues(player)
  resetValues(enemy)

  updateStamina({ player, name: 'player' })
  updateStamina({ player: enemy, name: 'enemy' })
  resetOthers('player')
  resetOthers('enemy')
}

const endScreen = document.querySelector('.end-screen')

resetBtn.addEventListener('click', () => {
  initialValues()
  timerId = setInterval(oneSecondLoop, 1000)
  ManaLoop = setInterval(manaRefreshLoop, 150)
  document.querySelector('#timer').innerHTML = time
  endScreen.classList.add('off')
})

const toLobby = document.querySelector('.btn-lobby')

toLobby.addEventListener('click', () => {
  initialValues()
  endScreen.classList.add('off')
  lobby.classList.remove('off')
})

animate()
