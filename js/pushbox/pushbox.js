var pushbox = document.getElementById("pushbox");
var pbc = pushbox.getContext("2d");

var levelInput;
var level = {};
var tiles = [];
var charPos = {};
var moves = 0;
var finished = false;

var levelSelector = document.getElementById("level");
levelSelector.value = 1;
levelSelector.min = 1;
levelSelector.max = levels.length - 1;

var tileSize = 80;
var charSize = tileSize * 0.8;

// Reset pushbox / change level
function pbReset() {
  document.getElementById("moves").innerHTML = 0;
  moves = 0;
  finished = false;
  levelInput = document.getElementById("level").value;
  level = {
    id: levelInput,
    width: levels[levelInput].width,
    height: levels[levelInput].height,
    tiles: levels[levelInput].tiles,
    start: {x: levels[levelInput].start.x, y: levels[levelInput].start.y}
  };
  canvasSize("pushbox", level.width * tileSize, level.height * tileSize);
  tiles = JSON.parse(JSON.stringify(level.tiles)); // copy without ref
  drawTiles();
  charPos = {x: level.start.x, y: level.start.y};
  drawCharacter(charPos.x, charPos.y);
}

function canvasSize(id, x, y) {
  var canvas = document.getElementById(id);
  canvas.width = x;
  canvas.height = y;
}

// Draw level
function drawTiles() {
  var x, y, border, size;
  for (var j = 0; j < level.height; j++) {
    for (var i = 0; i < level.width; i++) {
      var tileType = tiles[j][i];
      x = tileSize * i;
      y = tileSize * j;
      // Draw border if > 0
      if (tileTypes[tileType].borderWidth > 0) {
        pbc.fillStyle = tileTypes[tileType].borderColor;
        pbc.fillRect(x, y, tileSize, tileSize);
      }
      // Adjust size according to border
      border = Math.ceil(tileTypes[tileType].borderWidth * tileSize);
      size = tileSize - 2 * border;
      // Draw tile 
      pbc.fillStyle = tileTypes[tileType].color;
      pbc.fillRect(x + border, y + border, size, size);
    }
  }
}

function drawCharacter(tileX, tileY) {
  pbc.fillStyle = "#d90";
  var x = tileSize * tileX + tileSize / 2;
  var y = tileSize * tileY + tileSize / 2;
  pbc.beginPath();
  pbc.arc(x, y, charSize / 2, 0, 2 * Math.PI);
  pbc.fill();
  pbc.strokeStyle = "black";
  pbc.stroke();
}

function move(x, y) {
  var nextTile = {};
  var pushTile = {};
  // Update Char pos and infos
  function moveChar() {
    charPos.x += x;
    charPos.y += y;
    if (finished === false) {moves++;}
    document.getElementById("moves").innerHTML = moves;
  }
  // Is the next tile inside of the grid?
  if (charPos.x + x >= 0 && charPos.x + x < level.width &&
      charPos.y + y >= 0 && charPos.y + y < level.height) {
    nextTile = {x: charPos.x + x, y: charPos.y + y, 
                type: tiles[charPos.y + y][charPos.x + x]};
  } else {
    nextTile = {type: "empty"};
  }
  // Is the push tile inside of grid?
  if (charPos.x + x * 2 >= 0 && charPos.x + x * 2 < level.width &&
      charPos.y + y * 2 >= 0 && charPos.y + y * 2 < level.height) {
    pushTile = {x: charPos.x + 2 * x, y: charPos.y +  2 * y,
                type: tiles[charPos.y + 2 * y][charPos.x + 2 * x]};
  } else {
    pushTile = {type: "empty"};
  }
  // Is the next tile walkable?
  if (tileTypes[nextTile.type].walkable === true) {
    moveChar();
  } 
  // Is the next tile pushable?
  else if (tileTypes[nextTile.type].pushable === true) {
    // Is the pushtile boxable?
    if (tileTypes[pushTile.type].boxable === true) {
      tiles[nextTile.y][nextTile.x] = tileTypes[nextTile.type].onTopOf;
      tiles[pushTile.y][pushTile.x] = tileTypes[pushTile.type].boxOnTop;
      moveChar();
      // Check if there are no holes left
      var holes = [];
      for (var i = 0; i < level.height; i++) {
        holes.push(tiles[i].indexOf("hole"));
      }
      holes.sort(function(a, b){return b-a});
      if (holes[0] === -1) {
        victory();
      }
    }
  }
  // Update tiles
  drawTiles();
  drawCharacter(charPos.x, charPos.y);
}

function victory() {
  finished = true;
}

// Changing level
function changeLevel(n) {
  var levelCurrent = Number(levelSelector.value);
  var levelMin = Number(levelSelector.min);
  var levelMax = Number(levelSelector.max);
  levelCurrent += n;
  if (levelCurrent < levelMin) {
    levelCurrent = levelMin;
  } else if (levelCurrent > levelMax) {
    levelCurrent = levelMax;
  }
  levelSelector.value = levelCurrent;
}

// Keyboard inputs
window.onkeydown = function(event) {
  var key = event.which || event.keyCode;
  switch (key) {
    case 37: // Left
    case 65: // A
    case 81: // Q 
      move(-1, 0);
      break;
    case 38: // Up
    case 87: // W
    case 90: // Z
      move(0, -1);
      break;
    case 39: // Right
    case 68: // D 
      move(1, 0);
      break;
    case 40: // Down
    case 83: // S
      move(0, 1);
      break;
    case 33:
      changeLevel(1);
      break;
    case 34:
      changeLevel(-1);
      break;
    case 8: // Backspace
    case 82: // R
      pbReset();
  }
}

pbReset();
