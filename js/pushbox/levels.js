var levels = [
  {
    width: 3,
    height: 3,
    tiles:[
      ['wall'  , 'hole'  , 'wall'],
      ['ground', 'box'   , 'ground'],
      ['ground', 'ground', 'ground']
    ],
    start: {x: 1, y: 2}
  },
  {
    width: 6,
    height: 6,
    tiles:[
      ['wall'  , 'hole'  , 'wall',   'wall'  , 'wall'  , 'wall'],
      ['ground', 'ground', 'ground', 'box'   , 'ground', 'hole'],
      ['ground', 'ground', 'ground', 'wall'  , 'ground', 'ground'],
      ['ground', 'ground', 'ground', 'ground', 'ground', 'ground'],
      ['wall'  , 'wall'  , 'ground', 'ground', 'wall'  , 'box'],
      ['hole'  , 'box'   , 'ground', 'ground', 'ground', 'ground']
    ],
    start: {x: 1, y: 1}
  },
  {
    width: 6,
    height: 5,
    tiles:[
      ['wall'  , 'ground', 'ground', 'wall'  , 'ground', 'ground'],
      ['ground', 'ground', 'box'   , 'wall'  , 'box'   , 'ground'],
      ['hole'  , 'ground', 'hole'  , 'box'   , 'ground', 'hole'],
      ['ground', 'box'   , 'box'   , 'hole'  , 'wall'  , 'wall'],
      ['wall'  , 'ground', 'hole'  , 'ground', 'box'   , 'hole']
    ],
    start: {x: 1, y: 1}
  },
  {
    width: 9,
    height: 5,
    tiles:[
      ['hole'  , 'ground', 'ground', 'wall'  , 'wall'  , 'ground', 'box'   , 'ground', 'hole'],
      ['wall'  , 'box'   , 'ground', 'ground', 'wall'  , 'ground', 'ground', 'ground', 'wall'],
      ['ground', 'ground', 'ground', 'hole'  , 'hole'  , 'hole'  , 'ground', 'ground', 'ground'],
      ['box'   , 'ground', 'box'   , 'box'   , 'wall'  , 'hole'  , 'box'   , 'box'   , 'ground'],
      ['hole'  , 'ground', 'ground', 'ground', 'wall'  , 'wall'  , 'ground', 'ground', 'ground']
    ],
    start: {x: 1, y: 2}
  },
  {
    width: 7,
    height: 8,
    tiles:[
      ['ground', 'ground', 'ground', 'ground', 'ground', 'ground', 'wall'],
      ['box'   , 'box'   , 'ground', 'hole'  , 'box'   , 'ground', 'wall'],
      ['hole'  , 'ground', 'box'   , 'ground', 'box'   , 'ground', 'wall'],
      ['hole'  , 'wall'  , 'wall'  , 'ground', 'wall'  , 'wall'  , 'wall'],
      ['box'   , 'ground', 'ground', 'ground', 'ground', 'ground', 'ground'],
      ['ground', 'box'   , 'ground', 'ground', 'box'   , 'ground', 'ground'],
      ['hole'  , 'hole'  , 'hole'  , 'wall'  , 'ground', 'box'   , 'ground'],
      ['hole'  , 'hole'  , 'hole'  , 'wall'  , 'wall'  , 'ground', 'wall']],
    start: {x: 5, y: 7}
  }
];
