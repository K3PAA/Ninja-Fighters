import Player from './Player.js'
import Sprite from './Sprite.js'

export const fireFighter = new Player({
  position: {
    starting: {
      x: 100,
      y: 100,
    },
    x: 100,
    y: 100,
  },
  doubleJump: false,
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
  ultAttackBox: {
    x: 200,
    y: 200,
    values: {
      right: {
        x: 30,
        y: -60,
      },
      left: {
        x: -240,
        y: -60,
      },
    },
    offset: {
      x: 30,
      y: -60,
    },
  },
  attackBox: {
    x: 220,
    y: 50,
    values: {
      right: {
        x: 0,
        y: 0,
      },
      left: {
        x: -180,
        y: 0,
      },
    },
    offset: {
      x: 0,
      y: 0,
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
    ult: 'q',
    attack: 'e',
  },
  health: {
    starting: 180,
    current: 180,
  },
  basicAttack: {
    dmg: 15,
    cost: 30,
  },
  ult: {
    current: 0,
    dmg: 40,
    needed: 20,
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
    die: {
      number: 13,
      frames: 13,
      speed: 14,
    },
    attack: {
      number: 5,
      frames: 8,
      speed: 7,
    },
    ult: {
      number: 10,
      frames: 16,
      speed: 5,
    },
  },
})

export const groundFighter = new Player({
  position: {
    starting: {
      x: 800,
      y: 100,
    },
    x: 800,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  basicAttack: {
    dmg: 10,
    cost: 20,
  },
  ultAttackBox: {
    x: 140,
    y: 80,
    values: {
      right: {
        x: 40,
        y: 0,
      },
      left: {
        x: -140,
        y: 0,
      },
    },
    offset: {
      x: 40,
      y: 0,
    },
  },
  attackBox: {
    x: 130,
    y: 50,
    values: {
      right: {
        x: 0,
        y: 0,
      },
      left: {
        x: -90,
        y: 0,
      },
    },
    offset: {
      x: 0,
      y: 0,
    },
  },
  doubleJump: true,
  ult: {
    current: 0,
    dmg: 20,
    needed: 50,
  },
  moveSpeed: 5,
  keys: {
    up: 'i',
    down: 'k',
    left: 'j',
    right: 'l',
    ult: 'u',
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
    die: {
      number: 13,
      frames: 17,
      speed: 11,
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
      speed: 2,
    },
    ult: {
      number: 8,
      frames: 22,
      speed: 5,
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
