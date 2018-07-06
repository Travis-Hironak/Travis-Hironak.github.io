var tileTypes = {};

var outside = new TileType ({
  walkable: false
});
tileTypes.outside = outside;

var grass = new TileType ({
  imgId: 'grass',
  walkable: true
});
tileTypes.grass = grass;

var bush = new TileType ({
  imgId: 'bush',
  walkable: false
});
tileTypes.bush = bush;

var rock = new TileType ({
  imgId: 'rock',
  walkable: true
});
tileTypes.rock = rock;
