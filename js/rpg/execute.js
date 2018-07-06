var currentLvl = field;

function drawCanvas() {
  rpgc.fillStyle = 'black';
  rpgc.fillRect(0, 0, rpg.width, rpg.height);
  currentLvl.draw();
  player.move();
  document.getElementById('debug1').innerHTML = player.tileWalkable();
  document.getElementById('debug2').innerHTML = player.facing.x + ', ' +
    player.facing.y;
  document.getElementById('debug3').innerHTML = player.speed;
  player.draw();
}

/* ===========================================================================
  Code to execute
=========================================================================== */

setInterval(drawCanvas, 1000 / framerate);

//============================================================================

