import PlayerSprite from './PlayerSprite.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

export default class Player extends PlayerSprite {
  constructor({
    position,
    imageSrc,
    velocity,
    keys,
    moveSpeed,
    scale,
    allFrames,
    maxFrames,
    pose,
    reverse,
    offset,
    dir,
    attackBox,
    sprites,
    health,
    ult,
    stamina,
    width = 40,
    height = 100,
  }) {
    super({
      dir,
      position,
      imageSrc,
      scale,
      allFrames,
      maxFrames,
      pose,
      reverse,
      offset,
    })
    this.health = health
    this.velocity = velocity
    this.width = width
    this.height = height
    this.ult = ult

    this.attackBox = attackBox
    this.moveSpeed = moveSpeed
    this.gravity = 0.3
    this.keys = keys
    this.intervals = {
      left: undefined,
      right: undefined,
      basicAttack: undefined,
    }
    this.sprites = sprites
    this.stamina = stamina

    this.isAttacking = false

    window.addEventListener('keydown', this.move.bind(this))
    window.addEventListener('keyup', this.stop.bind(this))
  }

  move(e) {
    switch (e.key) {
      case this.keys.up:
        this.gravity = 0.2
        this.velocity.y = -10
        break
      case this.keys.left:
        if (!this.intervals.left) {
          this.currentFrame = 0
          this.intervals.left = setInterval(
            function () {
              this.velocity.x = -this.moveSpeed
            }.bind(this),
            10
          )
        }
        break
      case this.keys.right:
        if (!this.intervals.right) {
          this.currentFrame = 0
          this.intervals.right = setInterval(
            function () {
              this.velocity.x = this.moveSpeed
            }.bind(this),
            10
          )
        }
        break

      case this.keys.attack:
        this.currentFrame = 0
        if (!this.intervals.basicAttack) {
          this.attack()
          this.intervals.basicAttack = setInterval(
            function () {
              this.attack()
            }.bind(this),
            350
          )
        }

        break
    }
  }

  attack() {
    if (this.stamina.current - 10 >= 0) {
      this.isAttacking = true
      this.stamina.current -= 10
    } else {
      this.isAttacking = false
    }
  }

  takeHit() {
    this.health.current -= 10
    return (this.health.current * 100) / this.health.starting
  }

  stop(e) {
    switch (e.key) {
      case this.keys.up:
        break

      case this.keys.left:
        clearInterval(this.intervals.left)
        this.intervals.left = undefined
        this.velocity.x = 0
        break
      case this.keys.right:
        clearInterval(this.intervals.right)
        this.intervals.right = undefined
        this.velocity.x = 0
        break

      case this.keys.attack:
        clearInterval(this.intervals.basicAttack)
        this.intervals.basicAttack = undefined
        this.isAttacking = false
        break
    }
  }

  update() {
    if (this.intervals.right && this.intervals.left) this.velocity.x = 0

    this.velocity.y += this.gravity

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 150
    ) {
      this.velocity.y = 0
      this.gravity = 0
    } else {
      this.gravity += 0.01
    }

    if (this.velocity.x > 0 || this.velocity.x < 0) {
      if (this.velocity.x < 0) {
        this.attackBox.offset.x = this.attackBox.values.left.x
        this.dir = -1
      } else {
        this.attackBox.offset.x = this.attackBox.values.right.x
        this.dir = 1
      }
      this.pose = this.sprites.run.number
      this.maxFrames = this.sprites.run.frames
      this.framesHold = this.sprites.run.speed
    } else {
      this.pose = this.sprites.idle.number
      this.maxFrames = this.sprites.idle.frames
      this.framesHold = this.sprites.idle.speed
    }

    this.draw()
    this.animateFrames()
  }
}
