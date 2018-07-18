var field = new Level({
  width: 20,
  height: 30,
  spawn: {x: 9, y: 10}
});

field.fillTiles('grass');
var bushes = [
  [3,2], [10,8], [14,10], [13,11], [4,9], [15,22], [3,25]
];
for (var i = 0; i < bushes.length; i++) {
  var x = bushes[i][0];
  var y = bushes[i][1];
  field.tiles[x][y].type = 'bush';
}
field.tiles[11][10] = new Tile({
  type: 'rock',
  stepFunction: 'changeLevel',
  sfParams: ['castle']
});


var castle = new Level({
  width: 10,
  height: 10,
  spawn: {x: 5, y: 5}
});
castle.fillTiles('rock');
castle.tiles[8][8] = new Tile({
  type: 'grass',
  stepFunction: 'changeLevel',
  sfParams: ['field']
});
