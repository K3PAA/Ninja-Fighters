import Player from './Player.js'

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
    x: 150,
    y: 50,
    values: {
      right: {
        x: 20,
        y: 50,
      },
      left: {
        x: -130,
        y: 50,
      },
    },
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
  health: 100,
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
    attack: {
      number: 5,
      frames: 8,
      speed: 7,
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
        y: 50,
      },
      left: {
        x: -130,
        y: 50,
      },
    },
    offset: {
      x: 20,
      y: 50,
    },
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
  health: 100,
  scale: 2.25,
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
    attack: {
      number: 5,
      frames: 6,
      speed: 7,
    },
  },
})
