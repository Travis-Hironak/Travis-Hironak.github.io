var memory = document.getElementById('memory');
var cards = memory.getElementsByClassName('card');
var flipped = memory.getElementsByClassName('flipped');
var score = 0;
var elem, pair, pairFound;

// MemOptions
var memOptions = document.getElementById('memOptions');
var letters = document.getElementById('letters');
var numbers = document.getElementById('numbers');
var symbols = document.getElementById('symbols');
var greeks = document.getElementById('greek');
var none = document.getElementById('none');
var colors = document.getElementById('colors');
var lettersText = document.getElementById('lettersText');
var numbersText = document.getElementById('numbersText');
var symbolssText = document.getElementById('symbolssText');
var greekText = document.getElementById('greekText');
var noneText = document.getElementById('noneText');
var colorsText = document.getElementById('colorsText');

var symbolsArray = [
  '&spades;', '&clubs;',
  '&hearts;', '&diams;',
  '&#43;',    '&amp;',
  '&#36;',    '&#64;',
  '&pound;',  '&para;',
  '&sect;',   '&yen;',
  '&nwarr;',  '&nearr;',
  '&swarr;',  '&searr;'
]

var greekArray = [
  '&alpha;',   '&beta;',
  '&gamma;',   '&delta;',
  '&epsilon;', '&zeta;',
  '&eta;',     '&theta;',
  '&iota;',    '&kappa;',
  '&lambda;',  '&mu;',
  '&nu;',      '&xi;',
  '&omicron;', '&pi;'
]

// Code to execute
draw();
randomize();
clean(memOptions);

// Prevent text selection while clicking on the memory
memory.addEventListener('mousedown', function(e){e.preventDefault();}, false);

function flip(x) {
  elem = document.getElementById(x);

  if (elem.classList.contains('flipped') === false) {

    elem.classList.add('flipped');
    score += 1;
    document.getElementById('score').innerHTML = score;

    pair = elem.classList.item(1);
    pairFound = memory.getElementsByClassName(pair + ' ' + 'flipped');

    if (isEven(flipped.length)) {
      if (pairFound.length == 2) {
        for (i = 0; i < 2; i++) {
          pairFound[i].classList.add('found');
        }
      } else {
        setTimeout (unflip, 700);
      }
    }
  }
}

function unflip() {
  var fl = flipped.length;
  for (i = fl-1; i >= 0; i--) {
    if (flipped[i].classList.contains('found')) { continue; }
    flipped[i].classList.remove('flipped');
  }
}

function reset() {
  draw();
  score = 0;
  document.getElementById('score').innerHTML = score;
  randomize();
}

function randomize() {
  var cardsArray = [];
  for (i = 0; i < cards.length; i++) {
    cardsArray.push(cards[i].outerHTML);
  }
  cardsArray = shuffle(cardsArray);
  var memCards = '';
  for (i = 0; i < cardsArray.length; i++) {
    memCards += cardsArray[i];
  }
  memory.innerHTML = memCards;
}

function draw() {
  var pairs = document.getElementById('pairs').value;
  var letter = 'A';
  var number = 0;
  var symbol = symbolsArray[0];
  var greek = greekArray[0];
  var memCards = '';
  for (i = 0; i < pairs; i++) {
    memCards += '<div id="' + letter + '1" class="card mem' + letter +
      '" onclick="flip(this.id)">' + '<div class="front">' +
      '<span class="letter">' + letter + '</span>' +
      '<span class="number">' + number + '</span>' +
      '<span class="symbol">' + symbol + '</span>' +
      '<span class="greek">' + greek + '</span>' +
      '</div><div class="back"></div></div>' +
      '<div id="' + letter + '2" class="card mem' + letter +
      '" onclick="flip(this.id)">' + '<div class="front">' +
      '<span class="letter">' + letter + '</span>' +
      '<span class="number">' + number + '</span>' +
      '<span class="symbol">' + symbol + '</span>' +
      '<span class="greek">' + greek + '</span>' +
      '</div><div class="back"></div></div>';
    letter = incrLetter(letter);
    number++;
    symbol = incrChar(symbol, symbolsArray);
    greek = incrChar(greek, greekArray);
  }
  memory.innerHTML = memCards;
}

function toggleColor() {
  memory.classList.toggle('colored');
  colorsText.classList.toggle('checked');
}

// Enable/disable card types based on radio buttons
function cardType() {
  memory.classList.remove('lettered');
  memory.classList.remove('numbered');
  memory.classList.remove('symboled');
  memory.classList.remove('greeked');
  lettersText.classList.remove('checked');
  numbersText.classList.remove('checked');
  symbolsText.classList.remove('checked');
  greekText.classList.remove('checked');
  noneText.classList.remove('checked');
  if (letters.checked) {
    memory.classList.add('lettered');
    lettersText.classList.add('checked');
  } else if (numbers.checked) {
    memory.classList.add('numbered');
    numbersText.classList.add('checked');
  } else if (symbols.checked) {
    memory.classList.add('symboled');
    symbolsText.classList.add('checked');
  } else if (greeks.checked) {
    memory.classList.add('greeked');
    greekText.classList.add('checked');
  } else if (none.checked) {
    noneText.classList.add('checked');
  }
}

// Allow to use radio buttons by clicking the text next to it
lettersText.onclick =  function() {
  letters.checked = true;
  cardType();
}
document.getElementById('numbersText').onclick = function() {
  numbers.checked = true;
  cardType();
}
document.getElementById('symbolsText').onclick = function() {
  symbols.checked = true;
  cardType();
}
document.getElementById('greekText').onclick = function() {
  greek.checked = true;
  cardType();
}
document.getElementById('noneText').onclick =  function() {
  none.checked = true;
  cardType();
}

var colorsHover = false;
colors.onmouseover = function() {
  colorsHover = true;
}
colors.onmouseout = function() {
  colorsHover = false;
}

document.getElementById('colorsText').onclick = function() {
if (colorsHover === false) { // if mouse not on checkbox
   if (colors.checked === true) {
      colors.checked = false;
    }
    else {
      colors.checked = true;
    }
    toggleColor();
  }
}
