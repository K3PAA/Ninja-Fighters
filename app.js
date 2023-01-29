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
  attackBox: {
    x: 150,
    y: 50,
    offset: {
      x: 20,
      y: 50,
    },
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
  imageSrc: 'assets/ground.png',
  offset: {
    x: 305,
    y: 193,
  },
  height: 80,
  allFrames: {
    x: 25,
    y: 14,
  },
  scale: 2.25,
})

const animate = () => {
  requestAnimationFrame(animate)
  c.fillStyle = 'green'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  if (player.velocity.x > 0 || player.velocity.x < 0) {
    if (player.velocity.x < 0) {
      player.attackBox.offset.x = -130
      player.dir = -1
    } else {
      player.attackBox.offset.x = 20
      player.dir = 1
    }
    player.pose = 1
    player.framesToGo = 8
    player.framesHold = 8
  } else player.pose = 0

  if (player.isAttacking) {
    c.fillStyle = 'rgba(0,0,0,0.3)'
    c.fillRect(
      player.position.x + player.attackBox.offset.x,
      player.position.y + player.attackBox.offset.y,
      player.attackBox.x,
      player.attackBox.y
    )

    // Checking For Collision X axis
    if (
      (player.position.x + player.attackBox.x > enemy.position.x &&
        player.position.x < enemy.position.x + enemy.width &&
        player.dir === 1) ||
      (player.position.x - player.attackBox.x <
        enemy.position.x + enemy.width &&
        player.position.x > enemy.position.x + enemy.width &&
        player.dir === -1 &&
        player.isAttacking)
    ) {
      // Checking For Collision Y axis
      if (
        player.position.y + player.attackBox.y <
          enemy.position.y + enemy.height &&
        player.position.y + player.attackBox.offset.y > enemy.position.y
      ) {
        player.isAttacking = false
        enemy.takeHit()
      }
    }
  }

  enemy.update()
}

animate()
