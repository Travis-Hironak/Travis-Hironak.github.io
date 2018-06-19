var tileTypes = {
  empty: {
    walkable: false,
    pushable: false,
    boxable: false
  },
  g: {
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: 'b',
    color: '#511',
    borderColor: '#311',
    borderWidth: 0.01
  },
  w: {
    walkable: false,
    pushable: false,
    boxable: false,
    color: '#222',
    borderColor: '#333',
    borderWidth: 0.1
  },
  h: {
    walkable: false,
    pushable: false,
    boxable: true,
    boxOnTop: 'boxInHole',
    color: '#27100d',
    borderWidth: 0
  },
  b: {
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: 'g',
    color: '#961',
    borderColor: '#321',
    borderWidth: 0.05
  },
  boxInHole: {
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: 'boxOnBox',
    color: '#691',
    borderColor: '#321',
    borderWidth: 0.05
  },
  boxOnBox: {
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: 'boxInHole',
    color: '#961',
    borderColor: '#321',
    borderWidth: 0.05
  }
}
