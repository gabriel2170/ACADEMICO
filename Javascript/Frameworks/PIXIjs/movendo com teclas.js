<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<title>replit</title>
	<link href="style.css" rel="stylesheet" type="text/css" />
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js">

	</script>
</head>

<body>
	<script src="script.js">

	</script>
</body>

</html>




------------------------------------------------------------
//script.js
const app = new PIXI.Application({ 
  width: 650,
  height: 500,
  backgroundColor: 0xffffff,
  antialias: true

});

document.body.appendChild(app.view);

player = new PIXI.Sprite.from(
  'image.png'
);

player.anchor.set(0.5);

player.x = app.view.width / 2;
player.y = app.view.height / 2;

app.stage.addChild(player);

const keys = {};

window.addEventListener('keydown', event => {
  keys[event.keyCode] = true;
});

window.addEventListener('keyup', event => {
  keys[event.keyCode] = false;
});

app.ticker.add(gameLoop);

function gameLoop(){
  if (keys['37']){
    player.x -= 2;
  }
  if (keys['38']){
    player.y -= 2;
  }
  if (keys['39']){
    player.x += 2;
  }
  if (keys['40']){
    player.y += 2;
  }
}
