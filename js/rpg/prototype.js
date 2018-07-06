/*
  Global Variables
*/

var rpg = document.getElementById('rpg');
var rpgc = rpg.getContext('2d');

var framerate = 30;
var tileSize = 50;

/*
  Object constructors
*/

function Level(config) {
  this.width = config.width || 10;
  this.height = config.height || 10;
  this.tiles = config.tiles;
}

function Tile(config) {
  this.type = config.type || 'grass';
}

function TileType(config) {
  this.walkable = config.walkable || false;
  this.border = config.border || 'none';
  this.borderWidth = config.borderWidth || 0;
  this.color = config.color || 'brown';
  this.imgId = config.imgId || '';
}

function Character(config) {
  this.x  = config.x;
  this.y  = config.y;
  this.width = config.width || tileSize;
  this.height = config.height || tileSize * 3/2;
  this.imgId = config.imgId || '';
  this.speed = config.speed || 1/8 * tileSize;
  this.facing = config.facing || {x:0, y: 1};
  this.nextTile = config.nextTile || {x: this.x, y: this.y};
  this.sprint = config.sprint || false;
  this.sprintCoef = config.sprintCoef || 2;
}

/*
  Object prototypes
*/

// Level
Level.prototype.fillTiles = function(tileType) {
  if (this.tiles === undefined) {
    this.tiles = [];
    for (var i = 0; i < this.width; i++) {
      this.tiles.push([]);
      for (var j = 0; j < this.height; j++) {
        this.tiles[i].push( new Tile({type: tileType}) );
      }
    }
  }
}

Level.prototype.draw = function() {
  for (var i = 0; i < this.width; i++) {
    for (var j = 0; j < this.height; j++) {
      var coords = relCoord(i * tileSize, j * tileSize, player);
      var xMin = 0 - tileSize;
      var xMax = rpg.width;
      var yMin = 0 - tileSize;
      var yMax = rpg.height;
      // Draw tiles only if on screen
      if (coords.x > xMin && coords.x < xMax &&
          coords.y > yMin && coords.y < yMax ) {
        this.tiles[i][j].draw(coords.x, coords.y);
      }
    }
  }
}

// Tile
Tile.prototype.draw = function(x, y) {
  var type = this.type;
  var imgId = tileTypes[type].imgId;
  if (imgId !== '') {
    var img = document.getElementById(imgId);
    if (img.complete) {
      rpgc.drawImage(img, x, y, tileSize, tileSize);
    } else {
      img.onload = function() {
        rpgc.drawImage(img, x, y, tileSize, tileSize);
      }
    }
  }
}

// Character
Character.prototype.draw = function() {
  // rpgc.fillStyle = this.color;
  var coords = relCoord(this.x - this.width / 2,
                        this.y - this.height * 2/3,
                        player);
  var imgId = this.imgId;
  if (imgId !== '') {
    var img = document.getElementById(imgId);debugger;
    if (img.complete) {
      rpgc.drawImage(img, coords.x, coords.y, this.width, this.height);
    } else {
      img.onload = function() {
        rpgc.drawImage(img, coords.x, coords.y, this.width, this.height);
      }
    }
  }
}

// Start movement & set nextTile coordinates
Character.prototype.startMoving=  function(xCoef, yCoef) {
  if (this.x % tileSize === tileSize / 2 &&
      this.y % tileSize === tileSize / 2) {
    this.facing.x = xCoef;
    this.facing.y = yCoef;
    this.nextTile.x = this.x + tileSize * xCoef;
    this.nextTile.y = this.y + tileSize * yCoef;
  }
}

Character.prototype.tileWalkable = function() {
  var type;
  var centerX = this.x + tileSize * this.facing.x;
  var centerY = this.y + tileSize * this.facing.y;
  var tileX = Math.floor(centerX / tileSize);
  var tileY = Math.floor(centerY / tileSize);
  if (tileX < 0 || tileX >= currentLvl.width ||
      tileY < 0 || tileY >= currentLvl.height) {
    type ='outside';
  }
  else {type = currentLvl.tiles[tileX][tileY].type;}
  walkable = tileTypes[type].walkable;
  return walkable;
}

// Move until middle of next tile
Character.prototype.move = function() {
  if (this.x % tileSize === tileSize / 2 &&
      this.y % tileSize === tileSize / 2 &&
      this.tileWalkable() === false) {return;}
  var moveCoef = 1; // walk speed
  if (this.sprint === true) {
    moveCoef = this.sprintCoef; // sprint speed
  }
  var moveX = this.speed * this.facing.x * moveCoef;
  if (this.facing.x > 0) { // movement rightward
    if (this.x + moveX > this.nextTile.x) {
      this.x = this.nextTile.x;
    } else {
      this.x += moveX;
    }
  } else if (this.facing.x < 0) { // movement leftward
    if (this.x + moveX < this.nextTile.x) {
      this.x = this.nextTile.x;
    } else {
      this.x += moveX;
    }
  }
  var moveY = this.speed * this.facing.y * moveCoef;
  if (this.facing.y > 0) { // movement upward
    if (this.y + moveY > this.nextTile.y) {
      this.y = this.nextTile.y;
    } else {
      this.y += moveY;
    }
  } else if (this.facing.y < 0) { // movement downward
    if (this.y + moveY < this.nextTile.y) {
      this.y = this.nextTile.y;
    } else {
      this.y += moveY;
    }
  }
}

/*
  Object declarations
*/

var player = new Character({
  x: 9 * tileSize + tileSize / 2,
  y: 10 * tileSize + tileSize / 2,
  imgId: 'player',
  speed: 1/5 * tileSize
});


/*
  Functions
*/

// Coordinates relative to a ref element
function relCoord(elemX, elemY, ref) {
  var relX = elemX - ref.x + rpg.width / 2;
  var relY = elemY - ref.y + rpg.height / 2;
  return {x: relX, y: relY}; // relative coordinates as an object
}
