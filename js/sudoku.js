var sudoku = document.getElementById('sudoku');

sudokuBase();

function randomNumber(n) { // random number from 0 to (n-1)
  return Math.floor(Math.random() * n);
}

function shuffle(array) { // Fisher-Yates-Durstenfeld Shuffle
  var shufArray = array;
  var lcv = array.length - 1; // loop control value
  var n, nElem, lastElem; // lastElem == Last unchanged element
  for (; lcv >= 0; lcv--) {
    n = randomNumber(lcv + 1);
    nElem = shufArray[n];
    lastElem = shufArray[lcv];
    shufArray.splice(n, 1, lastElem);
    shufArray.splice(lcv, 1, nElem);
  }
  return shufArray;
}

function sudokuTable(n) {
  sudoku.className = 'sudoku n' + n;
  sudoku.innerHTML = '';
  var baseP = Math.pow(n, 2);
  for (var y = 0; y < baseP; y++) {
    var row = document.createElement('tr');
    for (var x = 0; x < baseP; x++) {
      var cell = document.createElement('td');
      row.appendChild(cell);
    }
    sudoku.appendChild(row);
  }
}

function sudokuGenerate(base) {
  var baseP = Math.pow(base, 2);
  var sudokuArray = [];
  var retries = 0;
  var maxRetries = Math.pow(baseP, 2);

  for (var y = 0; y < baseP; y++) { // for each row
    sudokuArray.push([]);

    for (var x = 0; x < baseP; x++) { // for each cell in the row

      var nbArray = []; // array 1 to n²
      for (var i = 1; i <= baseP; i++) { nbArray.push(i); }
      nbArray = shuffle(nbArray);

      var nbFilled = [];
      var row = sudokuArray[y];
      var rowLength = row.length;

      for (i = 0; i < rowLength; i++) { // adds every number in the row
        nbFilled.push(row[i]);
      }

      for (i = 0; i < y; i++) {  // adds every number in the column
        row = sudokuArray[i];
        nbFilled.push(row[x]);
      }

      var block = sudokuBlock(x, y, base);
      var xMin = base * block[0]; var xMax = xMin + base;
      var yMin = base * block[1]; var yMax = yMin + base;

      for (var j = yMin; j < yMax; j++) { // adds every number in the block
        if (j == y) {continue;}
        row = sudokuArray[j];
        if (row === undefined) {break;}
        for (i = xMin; i < xMax; i++) {
          if (i == x) {continue;}
          nbFilled.push(row[i]);
        }
      }

      do {
        var nb = nbArray.shift(); // next number until no duplicates
      } while (nbFilled.indexOf(nb) != -1)

      row = sudokuArray[y];

      if (nb != undefined) {
        row.push(nb); // Adds nb to the current row  
      } else {
        if (retries < maxRetries) {
          sudokuArray[y] = [];
          x = -1;
          retries++;
        } else {
          sudokuArray = [];
          sudokuArray.push([]);
          y = 0;
          x = -1;
          retries = 0;
        }
      }
    }
  }

  return sudokuArray;
}

function sudokuFill(base) {
  var sudokuGrid = sudokuGenerate(base);
  var baseP = Math.pow(base, 2);
  var tableRows = sudoku.getElementsByTagName('tr');

  for (var y = 0; y < baseP; y++) {
    var row = sudokuGrid[y];
    var tableRow = tableRows[y];
    var tableCells = tableRow.getElementsByTagName('td');

    for (var x = 0; x < baseP; x++) {
      cell = tableCells[x];
      cell.innerHTML = row[x];
    }
  }
}

function sudokuBlock(x, y, n) {
  var xBlock = Math.floor(x / n);
  var yBlock = Math.floor(y / n);
  var block = [xBlock, yBlock];
  return block;
}

function reset(base) {
  sudokuTable(base);
  sudokuFill(base);
}

function sudokuBase() {
  var base = document.getElementById('base').value;
  base = Number(base);
  switch (base) {
    case 2:
    case 3:
    case 4:
      reset(base);
      break;
    default:
      window.alert('La base doit être 2, 3 ou 4.');
  }
}
