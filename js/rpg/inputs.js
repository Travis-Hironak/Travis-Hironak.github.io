document.onkeydown = function (e) {
  var key = e.charCode || e.keyCode;
  if (key == 16 || key >= 37 && key <= 40) { // prevent selection
    e.preventDefault();
  }
}

/*
  Keybindings
*/
window.onkeydown = function(event) {
  var key = event.which || event.keyCode;
  switch (key) {
    case 37: // Left
    case 65: // A
    case 81: // Q
      player.startMoving(-1, 0);
      break;
    case 38: // Up
    case 87: // W
    case 90: // Z
      player.startMoving(0, -1);
      break;
    case 39: // Right
    case 68: // D
      player.startMoving(1, 0);
      break;
    case 40: // Down
    case 83: // S
      player.startMoving(0, 1);
      break;
    case 34: // PageDown
      changeLevel(field);
      break;
    case 33: // PageUp
      changeLevel(field2);
      break;
    case 16: // Shift
      event.preventDefault(); // prevent selection
      player.sprint = true;
      break;
  }
}

window.onkeyup = function(event) {
  var key = event.which || event.keyCode;
  switch (key) {
    case 16: // Shift
      player.sprint = false;
      break;
  }
}
