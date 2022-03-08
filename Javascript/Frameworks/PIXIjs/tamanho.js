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




-------------------------------------------------------------------
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

player.interactive = true;
player.on('click', scalePlayer);


function scalePlayer(event){
  player.scale.x += 1;
  player.scale.y += 1;
}
