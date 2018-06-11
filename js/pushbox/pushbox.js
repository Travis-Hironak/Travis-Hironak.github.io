var pushbox = document.getElementById('pushbox');
var pbc = pushbox.getContext('2d');
var mfd = document.getElementById('mfd');
var mfdc = mfd.getContext('2d');

var levelInput;
var levelId;
var level = {};
var tiles = [];
var charPos = {};
var moves = 0;
var finished = false;

var levelSelector = document.getElementById('levelInput');
levelSelector.value = 1;
levelSelector.min = 1;
levelSelector.max = levels.length - 1;

var tileSize = 60;
var charSize = tileSize * 0.8;

var tileType;
var editorTileType = 'ground';

function canvasSize(id, x, y) {
  var canvas = document.getElementById(id);
  canvas.width = x;
  canvas.height = y;
}

// Change text above pushbox
function pbText() {
  var pbText = document.getElementById('pbText');
  var maxLevel = levels.length - 1;
  if (finished === true)  {
    if (levelId === maxLevel) {
      pbText.innerHTML = 'Bravo, vous avez terminé le dernier niveau !'
    } else {
      pbText.innerHTML = 'Appuyez sur Entrée pour passer au prochain niveau.'
    }
  } 
  else {
    pbText.innerHTML = 'Poussez une boite dans chaque trou !';
  }
}

// Reset pushbox / change level
function pbReset() {
  document.getElementById('moves').innerHTML = 0;
  document.getElementById('moves').classList.remove('good');
  moves = 0;
  finished = false;
  pbText();
  levelInput = document.getElementById('levelInput').value;
  document.getElementById('level').innerHTML = levelInput;
  levelId = Number(levelInput);
  level = levels[levelInput];
  setTileSize();
  canvasSize('pushbox', level.width * tileSize, level.height * tileSize);
  tiles = JSON.parse(JSON.stringify(level.tiles)); // copy without ref
  drawTiles();
  charPos = {x: level.start.x, y: level.start.y};
  drawCharacter(charPos.x, charPos.y);
  if (mfdState === 'editor') {mfdState = 'controls';}
  drawMFD();
}

// Draw level
function drawTiles() {
  var x, y, border, size;
  for (var j = 0; j < level.height; j++) {
    for (var i = 0; i < level.width; i++) {
      tileType = tiles[j][i];
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

var character = {
  bgColor: '#d90',
  borderColor: 'black'
};

// Draw character (while playing level)
function drawCharacter(tileX, tileY) {
  pbc.fillStyle = character.bgColor;
  var x = tileSize * tileX + tileSize / 2;
  var y = tileSize * tileY + tileSize / 2;
  pbc.beginPath();
  pbc.arc(x, y, charSize / 2, 0, 2 * Math.PI);
  pbc.fill();
  pbc.strokeStyle = character.borderColor;
  pbc.stroke();
  if (finished === true) {
    var img = document.getElementById('smile');
    x -= charSize / 2;
    y -= charSize / 2;
    if (document.readyState === 'complete') {
      pbc.drawImage(img, x, y, charSize, charSize);
    } else {
      img.onload = function() {
        pbc.drawImage(img, x, y, charSize, charSize);
      }
    }
  }
}

// Draw start position (while editing level)
function drawStart(tileX, tileY) {
  pbc.font = '14px sans-serif';
  pbc.fillStyle = 'white';
  pbc.textAlign = 'center';
  var x = tileSize * tileX + tileSize / 2;
  var y = tileSize * tileY + tileSize / 2;
  pbc.fillText('Départ', x, y + 6, tileSize);
}

// Move
function move(x, y) {
  var nextTile = {};
  var pushTile = {};
  if (mfdState === 'controls') {
    // Update Char pos and infos
    function moveChar() {
      charPos.x += x;
      charPos.y += y;
      if (finished === false) {moves++;}
      document.getElementById('moves').innerHTML = moves;
    }
    // Is the next tile inside of the grid?
    if (charPos.x + x >= 0 && charPos.x + x < level.width &&
        charPos.y + y >= 0 && charPos.y + y < level.height) {
      nextTile = {x: charPos.x + x, y: charPos.y + y, 
                  type: tiles[charPos.y + y][charPos.x + x]};
    } else {
      nextTile = {type: 'empty'};
    }
    // Is the push tile inside of grid?
    if (charPos.x + x * 2 >= 0 && charPos.x + x * 2 < level.width &&
        charPos.y + y * 2 >= 0 && charPos.y + y * 2 < level.height) {
      pushTile = {x: charPos.x + 2 * x, y: charPos.y +  2 * y,
                  type: tiles[charPos.y + 2 * y][charPos.x + 2 * x]};
    } else {
      pushTile = {type: 'empty'};
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
          holes.push(tiles[i].indexOf('hole'));
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
}

function victory() {
  finished = true;
  pbText();
  document.getElementById('moves').classList.add('good');
  changeLevel(levelId + 1);
}

// Changing level
function changeLevel(n) {
  var currentLevel = Number(levelSelector.value);
  levelSelector.min = 1;
  levelSelector.max = levels.length - 1;
  var levelMin = Number(levelSelector.min);
  var levelMax = Number(levelSelector.max);
  currentLevel = n;
  if (currentLevel < levelMin) {
    currentLevel = levelMin;
  } else if (currentLevel > levelMax) {
    currentLevel = levelMax;
  }
  levelSelector.value = currentLevel;
}

// Keyboard inputs
window.onkeydown = function(event) {
  var key = event.which || event.keyCode;
  var currentLevel = Number(levelSelector.value);
  var nextLevel = currentLevel + 1;
  var previousLevel = currentLevel - 1;
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
    case 33: // PageUp
      changeLevel(nextLevel);
      break;
    case 34: // PageDown
      changeLevel(previousLevel);
      break;
    case 13: // Enter
    case 82: // R
      pbReset();
  }
}

var mfdCanvas = {};
var mfdCenter = {};

// Button object type
function Button(config) {
  this.width = config.width || tileSize / 2;
  this.height = config.height || this.width;
  this.x = config.x || 0;
  this.y = config.y || 0;
  this.bgColor = config.bgColor || '#666';
  this.borderWidth = config.borderWidth || 1;
  this.borderColor = config.borderColor || '#333';
  this.imgId = config.imgId || '';
}
// Button draw method
Button.prototype.draw = function() {
  mfdc.fillStyle = this.borderColor;
  mfdc.fillRect(this.x, this.y, this.width, this.width);
  mfdc.fillStyle = this.bgColor;
  mfdc.fillRect(this.x + this.borderWidth, this.y + this.borderWidth,
                this.width - 2 * this.borderWidth, 
                this.width - 2 * this.borderWidth);
  if (this.imgId !== '') {
    var img = document.getElementById(this.imgId);
    var x = this.x;
    var y = this.y;
    var width = this.width;
    var height = this.height;
    if (document.readyState === 'complete') {
      mfdc.drawImage(img, x, y, width, width);
    } else {
      img.onload = function() {
        mfdc.drawImage(img, x, y, width, width);
      }
    }
  }
}
// onButton method (checks if the mouse is on the button)
Button.prototype.onButton = function(mouseX, mouseY) {
  if (mouseX >= this.x && 
      mouseX < this.x + this.width && 
      mouseY >= this.y && 
      mouseY < this.y + this.width) {
    return true;
  }
}

var up = new Button({});
var down = new Button({});
var left = new Button({});
var right = new Button({});

var mfdSwitch = new Button({});

var mfdStart = new Button({});
var ground = new Button({});
var wall = new Button({});
var hole = new Button({});
var box = new Button({});

var mfdState = 'controls';


mfdStart.draw = function() {
  mfdc.fillStyle = character.bgColor;
  mfdc.beginPath();
  mfdc.arc(this.x + this.width / 2, this.y + this.width / 2, 
          this.width / 2, 0, 2 * Math.PI);
  mfdc.fill();
  mfdc.strokeStyle = character.borderColor;
  mfdc.stroke();
};

// Draw multifonction display (MFD)
function drawMFD() {
  var btnSize, btnX, btnY, btnColor, btnBorder, btnBorderColor;
  mfdCanvas = {width: level.width * tileSize, height: tileSize * 2, border: 5};
  mfdCenter = {x: mfdCanvas.width / 2, y: mfdCanvas.height / 2};
  canvasSize('mfd', mfdCanvas.width, mfdCanvas.height);
  // MFD background and borders
  mfdc.fillStyle = '#333'; // Border
  mfdc.fillRect(0, 0, mfdCanvas.width, mfdCanvas.height);
  mfdc.fillStyle = '#2d211a'; // Background
  mfdc.fillRect(mfdCanvas.border, mfdCanvas.border,
                mfdCanvas.width - 2 * mfdCanvas.border, 
                mfdCanvas.height - 2 * mfdCanvas.border);
  // draw mfdSwitch button
  btnSize = tileSize / 2;
  btnX = mfdCanvas.width - btnSize * 3/2;
  btnY = btnSize / 2;
  mfdSwitch.width = btnSize;
  mfdSwitch.x = btnX;
  mfdSwitch.y = btnY;
  // MFD Controls
  if (mfdState === 'controls') {
    // Arrow buttons properties
    up.width = btnSize;
    up.x = mfdCenter.x + up.width * -1/2;
    up.y = mfdCenter.y + up.width * -3/2;
    up.imgId = 'arrowUp';
    down.width = btnSize;
    down.x = mfdCenter.x + down.width * -1/2;
    down.y = mfdCenter.y + down.width * 1/2;
    down.imgId = 'arrowDown';
    left.width = btnSize;
    left.x = mfdCenter.x + left.width * -3/2;
    left.y = mfdCenter.y + left.width * -1/2;
    left.imgId = 'arrowLeft';
    right.width = btnSize;
    right.x = mfdCenter.x + right.width * 1/2;
    right.y = mfdCenter.y + right.width * -1/2;
    right.imgId = 'arrowRight';
    // Draw arrow buttons
    up.draw();
    down.draw();
    left.draw();
    right.draw();
    mfdSwitch.imgId = "editor";
  }
  // MFD Editor
  else if (mfdState === 'editor') {
    var types = ['ground', 'wall', 'hole', 'box'];
    var n = types.length;
    var size = tileSize * 2/3;
    var space = (mfdCanvas.width - size * n) / (n + 1);
    btnX = btnSize * 1/2;
    // create start button object and draw it
    mfdStart.x = btnX; 
    mfdStart.y = btnY;
    mfdStart.width = btnSize;
    mfdStart.draw()
    // ground properties
    ground.x = space + 0 * (size + space);
    ground.y = mfdCanvas.height / 2;
    ground.width = size;
    ground.bgColor = tileTypes.ground.color;
    ground.borderWidth = tileTypes.ground.borderWidth * size;
    ground.borderColor = tileTypes.ground.borderColor;
    // wall properties
    wall.x = space + 1 * (size + space);
    wall.y = mfdCanvas.height / 2;
    wall.width = size;
    wall.bgColor = tileTypes.wall.color;
    wall.borderWidth = tileTypes.wall.borderWidth * size;
    wall.borderColor = tileTypes.wall.borderColor;
    // hole properties
    hole.x = space + 2 * (size + space);
    hole.y = mfdCanvas.height / 2;
    hole.width = size;
    hole.bgColor = tileTypes.hole.color;
    hole.borderWidth = tileTypes.hole.borderWidth * size;
    hole.borderColor = tileTypes.hole.borderColor;
    // box properties
    box.x = space + 3 * (size + space);
    box.y = mfdCanvas.height / 2;
    box.width = size;
    box.bgColor = tileTypes.box.color;
    box.borderWidth = tileTypes.box.borderWidth * size;
    box.borderColor = tileTypes.box.borderColor;
    // draw tile buttons
    ground.draw();
    wall.draw();
    hole.draw();
    box.draw();
    mfdSwitch.imgId = "leaveEditor";
  }
  mfdSwitch.draw();
}

// When clicking mfdSwitch
function editorToggle() {
  if (mfdState === 'controls') { // Activate editor mode
    mfdState = 'editor';
    document.getElementById('gridX').value = level.width;
    document.getElementById('gridY').value = level.height;
    document.getElementById('gridSize').classList.add('visible');
  } else {
    mfdState = 'controls'; // Activate play mode
    pbReset();
  }
  drawMFD();
}

// When clicking 'keep level' or 'new level'
function levelEditor(levelId) {
  var newLevelWidth = Number(document.getElementById('gridX').value);
  var newLevelHeight = Number(document.getElementById('gridY').value);
  var newLevelTiles = [];
  // Create new level
  if (levelId === 'new') {
    for (var j = 0; j < newLevelHeight; j++) {
      newLevelTiles.push([]);
      for (var i = 0; i < newLevelWidth; i++) {
        newLevelTiles[j].push('ground');
      }
    }
    var newLevel = {
      width: newLevelWidth,
      height: newLevelHeight,
      tiles: newLevelTiles,
      start: {x: 1, y: 1}
    }
    levels.push(newLevel);
    level = levels[levels.length - 1];
    changeLevel(levels.length - 1);
  }
  // Modify current level
  else if (levelId === 'keep') {
    var i, j;
    // Adjust height of level
    if (newLevelHeight < level.height) {
      for (j = newLevelHeight; j < level.height; j++) {
        level.tiles.pop();
      }
    } 
    else if (newLevelHeight > level.height) {
      heightDiff = newLevelHeight - level.height;
      for (j = level.height; j < newLevelHeight; j++) {
        var newRow = [];
        for (i = 0; i < level.width; i ++) {
          newRow.push('ground');
        }
        level.tiles.push(newRow);
      }
    }
    level.height = newLevelHeight;
    // Adjust width of level
    if (newLevelWidth < level.width) {
      for (j = 0; j < level.height; j++) {
        for (i = newLevelWidth; i < level.width; i++) {
          level.tiles[j].pop();
        }
      }
    }
    else if (newLevelWidth > level.width) {
      for (j = 0; j < level.height; j++) {
        for (i = level.width; i < newLevelWidth; i++) {
          level.tiles[j].push('ground');
        }
      }
    }
    level.width = newLevelWidth;
  }
  console.log(level.tiles);
  tiles = JSON.parse(JSON.stringify(level.tiles)); // copy without ref
  canvasSize('pushbox', level.width * tileSize, level.height * tileSize);
  drawTiles();
  drawMFD();
  drawStart(level.start.x, level.start.y);
  document.getElementById('gridSize').classList.remove('visible');
}


// When clicking on pushbox
pushbox.addEventListener('click', pbClick);
// Prevent text selection on multiple clicks
pushbox.addEventListener('mousedown', function(e){e.preventDefault();}, false);

function pbClick(event) {
  if (mfdState === 'editor') {
    var tileX = Math.floor(event.offsetX / tileSize);
    var tileY = Math.floor(event.offsetY / tileSize);
    if (editorTileType === 'start') {
      level.start.x = tileX;
      level.start.y = tileY;
    }
    else {
      level.tiles[tileY][tileX] = editorTileType;
      tiles = JSON.parse(JSON.stringify(level.tiles)); // copy without ref
    }
    drawTiles();
    drawStart(level.start.x, level.start.y);
  }
};

mfd.addEventListener('click', mfdClick);
// Prevent text selection on multiple clicks
mfd.addEventListener('mousedown', function(e){e.preventDefault();}, false);

// When clicking on the MFD
function mfdClick(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  // Switch between controls and editor
  if (mfdSwitch.onButton(x, y)) {editorToggle();}
  // Controls
  else if (mfdState === 'controls') {
    if (up.onButton(x, y)) {move(0, -1);}
    else if (down.onButton(x, y)) {move(0, 1);}
    else if (left.onButton(x, y)) {move(-1, 0);}
    else if (right.onButton(x, y)) {move(1, 0);}
  }
  // Editor
  else if (mfdState === 'editor') {
    if (mfdStart.onButton(x, y)) {editorTileType = 'start'}
    else if (ground.onButton(x, y)) {editorTileType = 'ground'}
    else if (wall.onButton(x, y)) {editorTileType = 'wall'}
    else if (hole.onButton(x, y)) {editorTileType = 'hole'}
    else if (box.onButton(x, y)) {editorTileType = 'box'}
  }
}

// Adjust tile size according to window size
function setTileSize() {
  var header = document.getElementById('mainHeader');
  var navbar = header.getElementsByClassName('navbar')[0];
  var headerHeight = navbar.clientHeight;
  
  var w = window.innerWidth;
  var h = window.innerHeight - headerHeight * 4;

  var tileW = Math.floor(w / (level.width * 10)) * 10;
  var tileH = Math.floor(h / ((level.height + 2)* 10)) * 10;

  if (tileW < tileH) {tileSize = tileW}
  else {tileSize = tileH}
  if (tileSize > 60) {tileSize = 60}
  charSize = tileSize * 0.8;
}

// Reset when changing window size
window.onresize = function() {
  pbReset();
}

pbReset();
