var currentLvl = field;

window.onresize = function() {
  resizeCanvas();
}

function drawCanvas() {
  rpgc.fillStyle = 'black';
  rpgc.fillRect(0, 0, rpg.width, rpg.height);
  currentLvl.draw();
  player.move();
  // document.getElementById('debug1').innerHTML = ;
  // document.getElementById('debug2').innerHTML = ;
  // document.getElementById('debug3').innerHTML = ;
  player.draw();
}

/* ===========================================================================
  Code to execute
=========================================================================== */

player.spawn();
resizeCanvas();
setInterval(drawCanvas, 1000 / framerate);

//============================================================================

