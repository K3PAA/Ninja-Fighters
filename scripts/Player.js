import PlayerSprite from './PlayerSprite.js'
import { updateStamina } from './utils.js'

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
    ultAttackBox,
    maxFrames,
    pose,
    doubleJump,
    reverse,
    offset,
    dir,
    basicAttack,
    attackBox,
    sprites,
    health,
    ult,
    stamina,
    width = 40,
    height = 100,
    name,
    canAnimate = true,
  }) {
    super({
      canAnimate,
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

    this.canAnimate = canAnimate
    this.ultAttackBox = ultAttackBox
    this.doubleJump = doubleJump
    this.basicAttack = basicAttack
    this.health = health
    this.velocity = velocity
    this.width = width
    this.height = height
    this.ult = ult

    this.canMove = true
    this.name = name
    this.touchGround = true

    this.jumped = 0
    this.isUlting = false

    this.attackBox = attackBox
    this.moveSpeed = moveSpeed
    this.gravity = 0.3
    this.keys = keys
    this.intervals = {
      left: undefined,
      right: undefined,
      basicAttack: undefined,
    }

    this.isDead = false
    this.sprites = sprites
    this.stamina = stamina

    this.hitted = false
    this.canAttack = false

    window.addEventListener('keydown', this.move.bind(this))
    window.addEventListener('keyup', this.stop.bind(this))
  }

  move(e) {
    switch (e.key) {
      case this.keys.up:
        if (!this.isUlting && !this.isDead) {
          if (this.touchGround || (this.doubleJump && this.jumped < 2)) {
            this.gravity = 0.2
            this.velocity.y = -10
            this.jumped++
          } else if (this.touchGround && !this.isUlting) {
            this.gravity = 0.2
            this.velocity.y = -10
            this.jumped++
          }
          this.touchGround = false
        }

        break
      case this.keys.left:
        if (!this.intervals.left && !this.isUlting && !this.isDead) {
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
        if (!this.intervals.right && !this.isUlting && !this.isDead) {
          this.intervals.right = setInterval(
            function () {
              this.velocity.x = this.moveSpeed
            }.bind(this),
            10
          )
        }
        break

      case this.keys.attack:
        if (!this.intervals.basicAttack && !this.isUlting && !this.isDead) {
          if (this.stamina.current - this.basicAttack.cost > 0)
            this.switchSprite('basic-attack')
          this.intervals.basicAttack = setInterval(
            function () {
              // this.attack()
            }.bind(this),
            400
          )
        }
        break

      case this.keys.ult:
        if (this.ult.current === this.ult.needed && !this.isDead) {
          this.ult.current = 0
          this.switchSprite('super-attack')
        }
        break
    }
  }

  attack() {
    this.canAttack = true
  }

  takeHit(dmg) {
    this.health.current -= dmg
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
        if (
          this.currentFrame >= this.sprites.attack.frames - 2 ||
          this.currentFrame < 2
        ) {
          this.resetAttack()
        } else {
          let x = setInterval(() => {
            {
              if (this.currentFrame >= this.sprites.attack.frames - 2) {
                this.resetAttack()
                clearInterval(x)
                x = undefined
              }
            }
          }, this.sprites.attack.speed)
        }

        break
    }
  }

  resetAttack() {
    clearInterval(this.intervals.basicAttack)
    this.intervals.basicAttack = undefined
    this.canAttack = false
  }

  switchSprite(sprite) {
    switch (sprite) {
      case 'die':
        if (this.pose !== this.sprites.die.number) {
          this.pose = this.sprites.die.number
          this.maxFrames = this.sprites.die.frames
          this.framesHold = this.sprites.die.speed
          this.currentFrame = 0
        }
        break
      case 'super-attack':
        if (this.pose !== this.sprites.ult.number) {
          this.pose = this.sprites.ult.number
          this.maxFrames = this.sprites.ult.frames
          this.framesHold = this.sprites.ult.speed
          this.currentFrame = 0
          this.isUlting = true
        }
        break
      case 'basic-attack':
        if (this.pose !== this.sprites.attack.number) {
          this.pose = this.sprites.attack.number
          this.maxFrames = this.sprites.attack.frames
          this.framesHold = this.sprites.attack.speed
          this.currentFrame = 0
        }

        break

      case 'move-right':
        this.pose = this.sprites.run.number
        this.maxFrames = this.sprites.run.frames
        this.framesHold = this.sprites.run.speed
        this.dir = 1
        this.attackBox.offset.x = this.attackBox.values.right.x
        this.ultAttackBox.offset.x = this.ultAttackBox.values.right.x

        break

      case 'move-left':
        this.attackBox.offset.x = this.attackBox.values.left.x
        this.ultAttackBox.offset.x = this.ultAttackBox.values.left.x
        this.dir = -1
        this.pose = this.sprites.run.number
        this.maxFrames = this.sprites.run.frames
        this.framesHold = this.sprites.run.speed

        break

      case 'jump':
        this.pose = this.sprites.jump.number
        this.maxFrames = this.sprites.jump.frames
        this.framesHold = this.sprites.jump.speed
        break

      case 'fall':
        this.pose = this.sprites.fall.number
        this.maxFrames = this.sprites.fall.frames
        this.framesHold = this.sprites.fall.speed
        break

      default:
        if (this.pose !== this.sprites.idle.number) {
          this.pose = this.sprites.idle.number
          this.maxFrames = this.sprites.idle.frames
          this.framesHold = this.sprites.idle.speed
        }
        break
    }
  }

  update() {
    if (!this.canMove) {
      this.draw()
      return
    }

    if (this.sprites.die.number === this.pose) {
      this.isDead = true
      if (this.currentFrame === this.sprites.die.frames - 1) {
        this.canAnimate = false
      }
    } else if (this.isUlting) {
      if (this.currentFrame === this.sprites.ult.frames - 1) {
        this.switchSprite('idle')
        this.isUlting = false
      }
    } else if (!this.intervals.basicAttack || this.stamina.current <= 0) {
      if (this.velocity.y < 0) this.switchSprite('jump')
      else if (this.velocity.y >= 0 && !this.touchGround)
        this.switchSprite('fall')
      else if (this.velocity.x > 0) this.switchSprite('move-right')
      else if (this.velocity.x < 0) this.switchSprite('move-left')
      else this.switchSprite('idle')
    } else {
      if (this.stamina.current === 0) this.resetAttack()
      if (this.currentFrame === 0) {
        this.hitted = false
        this.canAttack = false
      }
      if (
        this.currentFrame >= 2 &&
        this.currentFrame < 4 &&
        !this.hitted &&
        this.stamina.current - this.basicAttack.cost > 0
      ) {
        this.attack()
      } else if (this.currentFrame === 4) this.canAttack = false
    }

    if (
      this.intervals.right &&
      this.intervals.left &&
      this.sprites.die.number !== this.pose &&
      !this.isUlting
    ) {
      this.velocity.x = 0
      this.switchSprite('idle')
    }
    this.velocity.y += this.gravity

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
      this.touchGround = true
      this.velocity.y = 0
      this.gravity = 0
      this.jumped = 0
    } else {
      this.gravity += 0.02
    }

    this.draw()
    this.animateFrames()
  }
}
