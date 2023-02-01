const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

export default class Sprite {
  constructor({ imageSrc, position, scale = 1, frameMax = 1 }) {
    this.image = new Image()
    this.image.src = imageSrc
    this.position = position
    this.scale = scale
    this.frameMax = frameMax
    this.currentFrame = 0
    this.framesElapsed = 0
    this.framesHold = 6
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentFrame * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animate() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      this.framesElapsed = 0
      if (this.currentFrame === this.frameMax - 1) {
        this.currentFrame = 0
      } else this.currentFrame++
    }
  }

  update() {
    this.draw()
    this.animate()
  }
}
