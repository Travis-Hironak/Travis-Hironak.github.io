var tileTypes = {
  empty: { // empty tile (outside grid)
    walkable: false,
    pushable: false,
    boxable: false
  },
  g: { // ground
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: 'b',
    color: '#511',
    borderColor: '#311',
    borderWidth: 0.01
  },
  w: { // wall
    walkable: false,
    pushable: false,
    boxable: false,
    color: '#222',
    borderColor: '#333',
    borderWidth: 0.1
  },
  h: { // hole
    walkable: false,
    pushable: false,
    boxable: true,
    boxOnTop: 'boxInHole',
    color: '#27100d',
    borderWidth: 0
  },
  b: { // box
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: 'g',
    color: '#961',
    borderColor: '#321',
    borderWidth: 0.05
  },
  boxInHole: { // box over a hole
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: 'boxOnBox',
    color: '#691',
    borderColor: '#321',
    borderWidth: 0.05
  },
  boxOnBox: { // box over a box
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: 'boxInHole',
    color: '#961',
    borderColor: '#321',
    borderWidth: 0.05
  }
}
