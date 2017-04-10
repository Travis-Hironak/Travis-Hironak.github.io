var memory = document.getElementById('memory');
var cards = memory.getElementsByClassName('card');
var flipped = memory.getElementsByClassName('flipped');
var score = 0;
var elem, pair, pairFound;

draw();
randomize();

function isEven(x) {
  return (x % 2) == 0;
}

function incrLetter(x) {
  return String.fromCharCode(x.charCodeAt(0) + 1);
}

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
  cardsArray.sort(function(a, b){return 0.5 - Math.random()});
  var memCards = '';
  for (i = 0; i < cardsArray.length; i++) {
    memCards += cardsArray[i];
  }
  memory.innerHTML = memCards;
}

function draw() {
  var pairs = document.getElementById('pairs').value;
  var letter = 'A';
  var memCards = '';
  for (i = 0; i < pairs; i++) {
    memCards += '<div id="' + letter + '1" class="card mem' + letter +
      '" onclick="flip(this.id)">' + '<div class="front">' + letter +
      '</div><div class="back"></div></div>' +
      '<div id="' + letter + '2" class="card mem' + letter +
      '" onclick="flip(this.id)">' + '<div class="front">' + letter +
      '</div><div class="back"></div></div>';
    letter = incrLetter(letter);
  }
  memory.innerHTML = memCards;
}
