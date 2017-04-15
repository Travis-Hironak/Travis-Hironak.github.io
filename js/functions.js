function spoiler() {
  var button = document.activeElement;
  button.classList.toggle('active');
  button.nextElementSibling.classList.toggle('visible');
  var text = button.innerHTML;
  text = (text.indexOf('Afficher') >= 0) ? 
    text.replace('Afficher', 'Cacher') :
    text.replace('Cacher', 'Afficher');
  button.innerHTML = text;
}

function bodyNoScroll() {
  document.body.classList.toggle('noscroll');
}

function dataToSrc(elem) {
  var url = elem.getAttribute('data-src');
  elem.setAttribute('src', url);
}

function fullpic(thumb) {
  var overlay = thumb.nextElementSibling;
  var loader = overlay.children[0];
  var fullpic = overlay.children[1];
  dataToSrc(fullpic);
  overlay.classList.add('visible');
  bodyNoScroll();
  fullpic.onload = function() {
    loader.classList.add('hidden');
    fullpic.classList.remove('hidden');
  }
}

function gallery(thumb) {
  var sib = thumb.nextElementSibling;
  while (sib.classList.contains('overlay') == false) {
    sib = sib.nextElementSibling;
  }
  bodyNoScroll();
  sib.classList.add('visible');
  var images = thumb.parentNode.getElementsByTagName('img');
  var i = 0;
  while (images[i] != thumb) { i++; }
  var carousel = sib.children[0];
  var fullpics = carousel.getElementsByTagName('img');
  var current = fullpics[i];
  current.classList.add('current');
  var previous = (i == 0) ? fullpics[fullpics.length - 1] : fullpics[i - 1];
  previous.classList.add('previous');
  var next = ( i == fullpics.length - 1 ) ? fullpics[0] : fullpics[i + 1];
  next.classList.add('next');
  if (current.getAttribute('src').charAt != 'h') {
    dataToSrc(current);
  }
  current.onload = function() {
    if (next.getAttribute('src').charAt != 'h') {
      dataToSrc(next);
    }
    if (previous.getAttribute('src').charAt != 'h') {
      dataToSrc(previous);
    }
  }
}

function hideOverlay(overlay) {
  overlay.classList.remove('visible');
  bodyNoScroll();
}

function hideCarousel(fullpic) {
  var carousel = fullpic.parentNode;
  var overlay = carousel.parentNode;
  overlay.classList.remove('visible');
  bodyNoScroll();
  var fullpics = carousel.getElementsByTagName('img');
  for (i = 0; i < fullpics.length; i++) {
    fullpics[i].classList.remove('previous', 'current', 'next');
  }
}

function carouselNext(control) {
  var carousel = control.parentNode;
  var fullpics = carousel.getElementsByTagName('img');
  var previous = carousel.getElementsByClassName('previous')[0];
  var current = carousel.getElementsByClassName('current')[0];
  var next = carousel.getElementsByClassName('next')[0];
  var newNext;
  var i = 0;
  while (fullpics[i] != next) { i++; }
  if (i == fullpics.length - 1) {
    newNext = fullpics[0];
  } else {
    newNext = fullpics[i + 1];
  }
  if (newNext.getAttribute('src').charAt != 'h') {
    dataToSrc(newNext);
  }
  previous.classList.remove('previous');
  current.className = current.className.replace('current', 'previous');
  next.className = next.className.replace('next', 'current');
  newNext.classList.add('next');
}

function carouselPrevious(control) {
  var carousel = control.parentNode;
  var fullpics = carousel.getElementsByTagName('img');
  var previous = carousel.getElementsByClassName('previous')[0];
  var current = carousel.getElementsByClassName('current')[0];
  var next = carousel.getElementsByClassName('next')[0];
  var newPrevious;
  var i = 0;
  while (fullpics[i] != previous) { i++; }
  if (i == 0) {
    newPrevious = fullpics[fullpics.length - 1];
  } else {
    newPrevious = fullpics[i - 1];
  }
  if (newPrevious.getAttribute('src').charAt != 'h') {
    dataToSrc(newPrevious);
  }
  next.classList.remove('next');
  current.className = current.className.replace('current', 'next');
  previous.className = previous.className.replace('previous', 'current');
  newPrevious.classList.add('previous');
}
