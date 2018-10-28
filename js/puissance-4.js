// Global variables ===========================================================

var domGrid = document.getElementById('grid');

var options = document.getElementById('options');
var pvp = document.getElementById('pvp');
var pve = document.getElementById('pve');
var pvpText = document.getElementById('pvpText');
var pveText = document.getElementById('pveText');

var domCurrentPlayer = document.getElementById('currentPlayer');

var grid = [];

var gridWidth = 7;
var gridHeight = 6;

var currentPlayer = 1;

var ingame = true;
var gamemode = 'pvp';
var aiPlaying= false;

// Event Listeners ============================================================

pvpText.addEventListener('click', function(){
  changeGamemode('pvp');
});
pveText.addEventListener('click', function(){
  changeGamemode('pve');
});

// Functions ==================================================================

function createGrid(w, h) {
  for (var x = 0; x < w; x++) {
    grid.push([]);
    var column = document.createElement('div');
    column.classList.add('column');
    column.id = x;
    column.addEventListener('click', placeToken);
    for (var y = 0; y < h; y++) {
      grid[x].push(0);
      var slot = document.createElement('div');
      slot.classList.add('slot');
      var token = document.createElement('div');
      token.classList.add('token');
      slot.appendChild(token);
      column.appendChild(slot);
    }
    domGrid.appendChild(column);
  }
}

function placeToken() {
  var xPos = this.id;
  var yPos = gridHeight - 1;
  if (ingame === true && aiPlaying === false) {
    while (grid[xPos][yPos] > 0) {
      yPos--;
    }
    if (yPos >= 0) {
      grid[xPos][yPos] = currentPlayer;
      var domColumn = document.getElementsByClassName('column');
      var domSlots = domColumn[xPos].getElementsByClassName('slot');
      domSlots[yPos].classList.add('p' + currentPlayer);
      checkForWin();
      changePlayer();
    }
  }
}

function placeTokenAI() {
  if (gamemode === 'pve' && currentPlayer === 2 && ingame === true) {
    var possiblePos = [];
    for (var x = 0; x < gridWidth; x++) {
      var pos = {};
      if (grid[x][0] === 0) {
        pos.x = x;
        var y = gridHeight - 1;
        while (grid[x][y] > 0) {
          y--;
        }
        pos.y = y;
        // pos.score = randomNumber(gridWidth);
        pos.score = getScore(x, y);
        possiblePos.push(pos);
      }
    }
    // Score for each possible position
    var scores = [];
    for (var i = 0; i < possiblePos.length; i++) {
      scores.push(possiblePos[i].score);
    }
    var maxScore = Math.max(...scores);
    // Remove position if score is less than the max score
    for (i = possiblePos.length - 1; i >= 0; i--) {
      if (possiblePos[i].score < maxScore) {
        possiblePos.splice(i, 1);
      }
    }
    shuffle(possiblePos); // Get a random position among the remaining ones
    var xPos = possiblePos[0].x;
    var yPos = possiblePos[0].y;
    grid[xPos][yPos] = currentPlayer;
    var domColumn = document.getElementsByClassName('column');
    var domSlots = domColumn[xPos].getElementsByClassName('slot');
    domSlots[yPos].classList.add('p' + currentPlayer);
    aiPlaying = false;
    checkForWin();
    changePlayer();
  }
}

function getScore(x, y) {
  var score = 0;
  var opponent;
  if (currentPlayer === 2) {
    opponent = 1;
  } else {
    opponent = 2;
  }

  // Best score for middle column and decreasing on the sides
  var a = Math.floor(gridWidth / 2);
  columnScore = Math.abs(Math.abs(x - a) - a);
  score = columnScore;

  // Best score for column blocking the win from the opponent
  // Horizontally
  horizontalScore = horizontalCheck(x, y, opponent);
  if (horizontalScore >= 3) {
    score = 10;
  } else if (horizontalScore >= 2) {
    score = 5 + columnScore - a;
  } else if (horizontalScore > score) {
    score = horizontalScore + columnScore - a;
  }
  // Vertically
  verticalScore = verticalCheck(x, y, opponent);
  if (verticalScore >= 3) {
    score = 10;
  } else if (verticalScore > score && verticalScore > horizontalScore) {
    score = verticalScore + columnScore - a;
  }
  // Diagonally down
  diagDownScore = diagonalDownCheck(x, y, opponent);
  if (diagDownScore >= 3) {
    score = 10;
  } else if (diagDownScore > score && diagDownScore > horizontalScore &&
      diagDownScore > verticalScore) {
    score = diagDownScore + columnScore - a;
  }
  // Diagonally up
  diagUpScore = diagonalUpCheck(x, y, opponent);
  if (diagUpScore >= 3) {
    score = 10;
  } else if (diagUpScore > score && diagUpScore > horizontalScore &&
      diagUpScore > verticalScore && diagUpScore > diagDownScore) {
    score = diagDownScore + columnScore - a;
  }

  // Check if placement will allow the other player to win
  var nextScores = [];
  var nextScore = 0;
  if (y - 1 >= 0) {
    nextScores.push(horizontalCheck(x, y - 1, opponent));
    nextScores.push(verticalCheck(x, y - 1, opponent));
    nextScores.push(diagonalDownCheck(x, y - 1, opponent));
    nextScores.push(diagonalUpCheck(x, y - 1, opponent));
    nextScore = Math.max(...nextScores);
    if (nextScore >= 3) {
      score = -10;
    }
  }

  var winScores = [];
  var winScore = 0;
  if (y - 1 >= 0) {
    winScores.push(horizontalCheck(x, y, currentPlayer));
    winScores.push(verticalCheck(x, y, currentPlayer));
    winScores.push(diagonalDownCheck(x, y, currentPlayer));
    winScores.push(diagonalUpCheck(x, y, currentPlayer));
    winScore = Math.max(...winScores);
    if (winScore >= 3) {
      score = 20;
    }
  }

  // console.log(score);
  return score;
}

function horizontalCheck(x, y, player) {
  var horizontalScore = 0;
  if (x - 1 >= 0) {
    if (grid[x - 1][y] === player) {
      horizontalScore++;
      if (x - 2 >= 0) {
        if (grid[x - 2][y] === player) {
          horizontalScore++;
          if (x - 3 >= 0) {
            if (grid[x - 3][y] === player) {
              horizontalScore++;
            }
          }
        }
      }
    }
  }
  if (x + 1 < gridWidth) {
    if (grid[x + 1][y] === player) {
      horizontalScore++;
      if (x + 2 < gridWidth) {
        if (grid[x + 2][y] === player) {
          horizontalScore++;
          if (x + 3 < gridWidth) {
            if (grid[x + 3][y] === player) {
              horizontalScore++;
            }
          }
        }
      }
    }
  }
  return horizontalScore;
}

function verticalCheck(x, y, player) {
  var verticalScore = 0;
  if (y - 1 >= 0) {
    if (grid[x][y - 1] === player) {
      verticalScore++;
      if (y - 2 >= 0) {
        if (grid[x][y - 2] === player) {
          verticalScore++;
          if (y - 3 >= 0) {
            if (grid[x][y - 3] === player) {
              verticalScore++;
            }
          }
        }
      }
    }
  }
  if (y + 1 < gridHeight) {
    if (grid[x][y + 1] === player) {
      verticalScore++;
      if (y + 2 < gridHeight) {
        if (grid[x][y + 2] === player) {
          verticalScore++;
          if (y + 3 < gridHeight) {
            if (grid[x][y + 3] === player) {
              verticalScore++;
            }
          }
        }
      }
    }
  }
  return verticalScore;
}

function diagonalDownCheck(x, y, player) {
  var diagDownScore = 0;
  if (y - 1 >= 0 && x - 1 >= 0) {
    if (grid[x - 1][y - 1] === player) {
      diagDownScore++;
      if (y - 2 >= 0 && x - 2 >= 0) {
        if (grid[x - 2][y - 2] === player) {
          diagDownScore++;
          if (y - 3 >= 0 && x - 3 >= 0) {
            if (grid[x - 3][y - 3] === player) {
              diagDownScore++;
            }
          }
        }
      }
    }
  }
  if (y + 1 < gridHeight && x + 1 < gridWidth) {
    if (grid[x + 1][y + 1] === player) {
      diagDownScore++;
      if (y + 2 < gridHeight && x + 2 < gridWidth) {
        if (grid[x + 2][y + 2] === player) {
          diagDownScore++;
          if (y + 3 < gridHeight && x + 3 < gridWidth) {
            if (grid[x + 3][y + 3] === player) {
              diagDownScore++;
            }
          }
        }
      }
    }
  }
  return diagDownScore;
}

function diagonalUpCheck(x, y, player) {
  var diagUpScore = 0;
  if (y - 1 >= 0 && x + 1 < gridWidth) {
    if (grid[x + 1][y - 1] === player) {
      diagUpScore++;
      if (y - 2 >= 0 && x + 2 < gridWidth) {
        if (grid[x + 2][y - 2] === player) {
          diagUpScore++;
          if (y - 3 >= 0 && x + 3 < gridWidth) {
            if (grid[x + 3][y - 3] === player) {
              diagUpScore++;
            }
          }
        }
      }
    }
  }
  if (y + 1 < gridHeight && x - 1 >= 0) {
    if (grid[x - 1][y + 1] === player) {
      diagUpScore++;
      if (y + 2 < gridHeight && x - 2 >= 0) {
        if (grid[x - 2][y + 2] === player) {
          diagUpScore++;
          if (y + 3 < gridHeight && x - 3 >= 0) {
            if (grid[x - 3][y + 3] === player) {
              diagUpScore++;
            }
          }
        }
      }
    }
  }
  return diagUpScore;
}

function changePlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    domCurrentPlayer.classList.remove('p1');
    domCurrentPlayer.classList.add('p2');
    if (gamemode === "pve") {
      aiPlaying = true;
      setTimeout(placeTokenAI, 1000);
    }
  } else {
    currentPlayer = 1;
    domCurrentPlayer.classList.remove('p2');
    domCurrentPlayer.classList.add('p1');
  }
}

function changeGamemode(gm) {
  gamemode = gm;
  pvpText.classList.remove('checked');
  pveText.classList.remove('checked');
  pvp.checked = false;
  pve.checked = false;
  window[gamemode].checked = true;
  window[gamemode + "Text"].classList.add('checked');
}

function checkForWin() {
  if (horizontalWin() || verticalWin() ||
      diagDownWin() || diagUpWin()) {
    victory(currentPlayer);
  }
}

function horizontalWin() {
  for (var x = 0; x < gridWidth; x++) {
    for (var y = 0; y < gridHeight; y++) {
      if (x + 3 < gridWidth) {
        if (grid[x][y] === currentPlayer &&
            grid[x + 1][y] === currentPlayer &&
            grid[x + 2][y] === currentPlayer &&
            grid[x + 3][y] === currentPlayer) {
          return true;
        }
      }
    }
  }
}

function verticalWin() {
  for (var x = 0; x < gridWidth; x++) {
    for (var y = 0; y < gridHeight; y++) {
      if (y + 3 < gridHeight) {
        if (grid[x][y] === currentPlayer &&
            grid[x][y + 1] === currentPlayer &&
            grid[x][y + 2] === currentPlayer &&
            grid[x][y + 3] === currentPlayer) {
          return true;
        }
      }
    }
  }
}

function diagDownWin() {
  for (var x = 0; x < gridWidth; x++) {
    for (var y = 0; y < gridHeight; y++) {
      if (x + 3 < gridWidth && y + 3 < gridHeight) {
        if (grid[x][y] === currentPlayer &&
            grid[x + 1][y + 1] === currentPlayer &&
            grid[x + 2][y + 2] === currentPlayer &&
            grid[x + 3][y + 3] === currentPlayer) {
          return true;
        }
      }
    }
  }
}

function diagUpWin() {
  for (var x = 0; x < gridWidth; x++) {
    for (var y = 0; y < gridHeight; y++) {
      if (x + 3 < gridWidth && y - 3 >= 0) {
        if (grid[x][y] === currentPlayer &&
            grid[x + 1][y - 1] === currentPlayer &&
            grid[x + 2][y - 2] === currentPlayer &&
            grid[x + 3][y - 3] === currentPlayer) {
          return true;
        }
      }
    }
  }
}

function victory(winner) {
  ingame = false;
  alert('Victoire du joueur ' + winner + " !");
}

// Code to execute ============================================================

createGrid(gridWidth, gridHeight);
clean(options);
