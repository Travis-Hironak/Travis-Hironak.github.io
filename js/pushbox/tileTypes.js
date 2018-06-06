var tileTypes = {
  empty: {
    walkable: false,
    pushable: false,
    boxable: false
  },
  ground: {
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: "box",
    color: "#511",
    borderColor: "#311",
    borderWidth: 0.01
  },
  wall: {
    walkable: false,
    pushable: false,
    boxable: false,
    color: "#222",
    borderColor: "#333",
    borderWidth: 0.1
  },
  hole: {
    walkable: false,
    pushable: false,
    boxable: true,
    boxOnTop: "boxInHole",
    color: "#27100d",
    borderWidth: 0
  },
  box: {
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: "ground",
    color: "#961",
    borderColor: "#321",
    borderWidth: 0.05
  },
  boxInHole: {
    walkable: true,
    pushable: false,
    boxable: true,
    boxOnTop: "boxOnBox",
    color: "#691",
    borderColor: "#321",
    borderWidth: 0.05
  },
  boxOnBox: {
    walkable: false,
    pushable: true,
    boxable: false,
    onTopOf: "boxInHole",
    color: "#961",
    borderColor: "#321",
    borderWidth: 0.05
  }
}
