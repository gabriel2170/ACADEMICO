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


--------------------------------------------------------
//levels.js
const levels = [
 {
 "floor": [
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89,
 89, 89, 89, 89, 89, 89, 89, 89
 ],
 "walls": [
 10, 10, 10, 10, 10, 10, 10, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 0, 0, 0, 0, 0, 0, 10,
 10, 10, 10, 10, 10, 10, 10, 10
 ],
 }
]

--------------------------------------------------------
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

  createMap();


  app.ticker.add(gameLoop);
}

function createMap() {
  let i = 0;
  let floorContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].floor[i]]
      );
      i++;
      return sprite;
    }
  );
  app.stage.addChild(floorContainer);
}

function createMap() {
  i = 0;
  let wallsContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].walls[i]]
      );
      i++;
      return sprite;
    }
  );
  app.stage.addChild(wallsContainer);
