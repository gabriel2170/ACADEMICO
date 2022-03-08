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




-----------------------------------------------------------------------------------
//script.js

const app = new PIXI.Application({ 
  backgroundColor: 0xffffff,
  antialias: true

});

document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();


graphics.lineStyle(5, 0x00ff00, 1);
graphics.beginFill(0xff0000);
graphics.drawRect(50, 100, 100, 100);
graphics.endFill();


graphics.lineStyle(5, 0x00ffff, 1);
graphics.beginFill(0xffff00);
graphics.drawRoundedRect(200, 150, 100, 100);
graphics.endFill();

graphics.lineStyle(0);
graphics.beginFill(0x00ff00);
graphics.drawCircle(50, 300, 50);
graphics.endFill();

graphics.lineStyle(0);
graphics.beginFill(0x0000ff);
graphics.drawPolygon(50, 400 , 200, 400, 125, 500);
graphics.endFill();

app.stage.addChild(graphics);
