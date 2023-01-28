import Sprite from './Sprite.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

export default class Player extends Sprite {
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
    this.velocity = velocity
    this.width = 40
    this.height = 100

    this.moveSpeed = moveSpeed
    this.gravity = 0.3
    this.keys = keys
    this.intervals = {
      left: undefined,
      right: undefined,
    }

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
          this.intervals.right = setInterval(
            function () {
              this.velocity.x = this.moveSpeed
            }.bind(this),
            10
          )
        }
        break
    }
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
    }
  }

  update() {
    this.draw()
    this.animateFrames()

    if (this.intervals.right && this.intervals.left) this.velocity.x = 0

    this.velocity.y += this.gravity

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (
      this.position.y + this.height + this.velocity.y >=
      canvas.height - 300
    ) {
      this.velocity.y = 0
      this.gravity = 0
    } else {
      this.gravity += 0.01
    }
  }
}
