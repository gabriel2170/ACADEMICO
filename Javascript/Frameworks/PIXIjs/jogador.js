<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>replit</title>
	<link href="style.css" rel="stylesheet" type="text/css" />
	<script  src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
 
</head>

<body>
  <script src="levels.js"></script>
	<script src="spriteUtilities.js"></script>
  <script src="script.js"></script>
  
</body>

</html>


-------------------------------------------------------------
//script.js
const app = new PIXI.Application({
  width: 650,
  height: 500,
  backgroundColor: 0xffffff,
  antialias: true

});

document.body.appendChild(app.view);

const sUtil = new SpriteUtilities(PIXI);
const keys = {};
let player;
let tileTextures;

app.loader.add(
  'tilesheet', 'tilesheet.png'
);
app.loader.load(setup);

function setup() {
  tileTextures = sUtils.filmstrip(
    app.loader.resources['tilesheet'].url,
    64, 64
  );

  createPlayer();


  app.ticker.add(gameLoop);
}


  function gameLoop() {
    //seta para esquerda
    if (keys['37']) {
      if (!player.playing) {
        player.textures = [
          tileTextures[81],
          tileTextures[82],
          tileTextures[83],
          tileTextures[81]
        ];
        player.play();
      }
      player.x -= 2;
    }

  }
  function gameLoop() {
 ...
    // Seta para direita
    if (keys['39']) {
      if (!player.playing) {
        player.textures = [
          tileTextures[78],
          tileTextures[79],
          tileTextures[80],
          tileTextures[78]
        ];
        player.play();
      }
      player.x += 2;
    }
 ...
  }
  function gameLoop() {
 ...
    // Seta para cima
    if (keys['38']) {
      if (!player.playing) {
        player.textures = [
          tileTextures[55],
          tileTextures[56],
          tileTextures[57],
          tileTextures[55]
        ];
        player.play();
      }
      player.y -= 2;
    }
 ...
  }
  function gameLoop() {
 ...
    // Seta para baixo
    if (keys['40']) {
      if (!player.playing) {
        player.textures = [
          tileTextures[52],
          tileTextures[53],
          tileTextures[54],
          tileTextures[52]
        ];
        player.play();
      }
      player.y += 2;
    }
  }
