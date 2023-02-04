const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

export default class PlayerSprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    allFrames = { x: 0, y: 0 },
    maxFrames,
    offset = { x: 0, y: 0 },
    dir = 1,
    pose = 0,
    canAnimate = true,
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesElapsed = 0
    this.dir = dir
    this.framesHold = 8
    this.maxFrames = maxFrames
    this.allFrames = allFrames
    this.currentFrame = 0
    this.pose = pose
    this.offset = offset
    this.canAnimate = canAnimate
  }

  draw() {
    c.save()
    c.translate(this.position.x, this.position.y)

    c.scale(this.dir, 1)
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.allFrames.x),
      this.pose * (this.image.height / this.allFrames.y),
      288,
      128,
      0 - this.offset.x - (this.dir === -1 && this.width),
      0 - this.offset.y,
      288 * this.scale,
      128 * this.scale
    )

    c.translate(-this.position.x, -this.position.y)
    c.restore()
  }

  animateFrames() {
    if (this.canAnimate) {
      this.framesElapsed++
      if (this.framesElapsed % this.framesHold === 0) {
        this.framesElapsed = 0
        if (this.currentFrame < this.maxFrames - 1) this.currentFrame++
        else {
          this.currentFrame = 0
        }
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}
