import Player from './Player.js'
import Sprite from './Sprite.js'

export const fireFighter = new Player({
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
    x: 220,
    y: 50,
    values: {
      right: {
        x: 20,
        y: 50,
      },
      left: {
        x: -200,
        y: 50,
      },
    },
    offset: {
      x: 20,
      y: 50,
    },
  },
  maxFrames: 8,
  stamina: {
    max: 120,
    current: 120,
  },
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
  health: {
    starting: 180,
    current: 180,
  },
  ult: {
    current: 0,
    need: 100,
  },
  scale: 2.25,
  sprites: {
    idle: {
      number: 0,
      frames: 8,
      speed: 4,
    },
    run: {
      number: 1,
      frames: 8,
      speed: 7,
    },
    jump: {
      number: 2,
      frames: 3,
      speed: 7,
    },
    fall: {
      number: 3,
      frames: 3,
      speed: 7,
    },
    attack: {
      number: 5,
      frames: 8,
      speed: 10,
    },
  },
})

export const groundFighter = new Player({
  position: {
    x: 800,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  attackBox: {
    x: 150,
    y: 50,
    values: {
      right: {
        x: 20,
        y: 40,
      },
      left: {
        x: -130,
        y: 40,
      },
    },
    offset: {
      x: 20,
      y: 40,
    },
  },
  ult: {
    current: 0,
    needed: 100,
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
  difference: {
    x: 0,
    y: 10,
  },
  health: {
    starting: 120,
    current: 120,
  },
  scale: 2.25,
  stamina: {
    max: 120,
    current: 120,
  },
  sprites: {
    idle: {
      number: 0,
      frames: 5,
      speed: 4,
    },
    run: {
      number: 1,
      frames: 8,
      speed: 7,
    },
    jump: {
      number: 2,
      frames: 3,
      speed: 7,
    },
    fall: {
      number: 3,
      frames: 3,
      speed: 7,
    },
    attack: {
      number: 5,
      frames: 6,
      speed: 3,
    },
  },
})

export const background = new Sprite({
  imageSrc: 'assets/bg.png',
  position: {
    x: 0,
    y: 0,
  },
})

export const shop = new Sprite({
  imageSrc: 'assets/shop.png',
  position: {
    x: 690,
    y: 191,
  },
  scale: 2.25,
  frameMax: 6,
})
