var sudoku = document.getElementById('sudoku');

reset();

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

function sudokuFill(base) {
  var rows = sudoku.getElementsByTagName('tr');
  var baseP = Math.pow(base, 2);
  var retries = 0;
  var maxRetries = 3 * Math.pow(base, 3);

  for (var y = 0; y < baseP; y++) { // for each row

    do {
      var row = rows[y];
      var rowCells = row.getElementsByTagName('td');

      for (var x = 0; x < baseP; x++) { // for each cell (column)
        var cell = rowCells[x];

        var nbArray = []; // Array 1 to n²
        for (var i = 1; i <= baseP; i++) { nbArray.push(i); }
        nbArray = shuffle(nbArray);

        var nbFilled = []; // Numbers already in row, column or block

        for (var j = 0; j < baseP; j++) { // for each cell in the row
          var sCellContent = Number(rowCells[j].innerHTML);
          if (sCellContent > 0) {
            nbFilled.push(sCellContent);
          }
        }

        for (j = 0; j < baseP; j++) { // for each cell in the column
          var searchCell = rows[j].getElementsByTagName('td')[x];
          sCellContent = Number(searchCell.innerHTML);
          if (sCellContent > 0) {
            nbFilled.push(sCellContent);
          }
        }

        var block = sudokuBlock(x, y, base);
        var xMin = base * block[0]; var xMax = xMin + base;
        var yMin = base * block[1]; var yMax = yMin + base;
        for (j = xMin; j < xMax; j++) { // for each cell in the block
          if (j == x) { continue }
          for (var k = yMin; k < yMax; k++) {
            if (k == y) { continue }
            searchCell = rows[k].getElementsByTagName('td')[j];
            sCellContent = Number(searchCell.innerHTML);
            if (sCellContent > 0) {
              nbFilled.push(sCellContent);
            }
          }
        }
        
        do { var nb = nbArray.shift(); }    // changes nb (next number)
        while (nbFilled.indexOf(nb) != -1); // as long as nb has a duplicate
        cell.innerHTML = nb;
      }

      var errors =  0;
      for (j = 0; j < baseP; j++) {
        searchCell = rowCells[j];
        sCellContent = searchCell.innerHTML;
        if (sCellContent == 'undefined') { errors++; }
      }

      if (errors > 0) {
        for (j = 0; j < baseP; j++) {
          cell = rowCells[j];
          cell.innerHTML = '';
        }
        retries++;
      }

      if (retries >= maxRetries) {
        for (j = 0; j < baseP; j++) {
          for (k = 0; k < baseP; k++) {
            var resetCell = rows[k].getElementsByTagName('td')[j];
            resetCell.innerHTML = '';
          }
        }
        retries = 0; x = 0; y = 0;
      }

    } while (errors > 0);
  }
}

function sudokuBlock(x, y, n) {
  var xBlock = Math.floor(x / n);
  var yBlock = Math.floor(y / n);
  var block = [xBlock, yBlock];
  return block;
}

function reset() {
  var base = document.getElementById('base').value;
  base = Number(base);
  sudokuTable(base);
  sudokuFill(base);
}
