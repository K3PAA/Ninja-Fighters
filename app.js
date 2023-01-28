import Player from './scripts/Player.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const player = new Player({
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 310,
    y: 186,
  },
  allFrames: {
    x: 28,
    y: 14,
  },
  maxFrames: 8,
  imageSrc: 'assets/fire.png',
  moveSpeed: 5,
  keys: {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd',
    ulti: 'q',
    attack: 'e',
  },
  scale: 2.25,
})

const enemy = new Player({
  position: {
    x: 800,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  moveSpeed: 5,
  keys: {
    up: 'i',
    down: 'k',
    left: 'j',
    right: 'l',
    ulti: 'u',
    attack: 'o',
  },
})

const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = 'green'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  if (player.velocity.x > 0 || player.velocity.x < 0) {
    if (player.velocity.x < 0) {
      player.dir = -1
    } else player.dir = 1
    player.pose = 1
    player.framesToGo = 8
    player.framesHold = 8
  }

  // enemy.update()
}

animate()
