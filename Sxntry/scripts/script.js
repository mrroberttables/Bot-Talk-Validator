const length = 800;
let player;
let binding = new Bindings();
let background;
let enemies = [];
timer = 200
//let enemyImage;

function setup() {
	createCanvas(length,length);

	background = new Image();
	background.src = 'images/background.png';

	//enemyImage = new Image();
	//enemyImage.src = 'images/enemy.png';

	player = new Player();
	enemies.push(new Enemy(1));
}

function draw() {
	drawingContext.drawImage(background,0,0);

	//Enemies
	if(enemies.length > 0) {
		for (var i = enemies.length - 1; i >= 0; i--) {
			//Check to see if enemy is colliding with light and decrease its health
			if(enemies[i].collisionCheck(player)) {
				//Decrease enemy health
				enemies[i].damage(player.getDamageDealt());

				if(enemies[i].getHealth() <= 0) {
					player.addScore(enemies[i].value);
					enemies.splice(i,1);
					continue;
				}
			}

			//Check to see if enemy is colliding with player and descrease player health
			if(enemies[i].x > 390 && enemies[i].x < 410 && enemies[i].y > 390 && enemies[i].y < 410) {
				player.damage(enemies[i].strength);
				enemies.splice(i,1);
				continue;
			}

			enemies[i].update();
			enemies[i].draw();
		}
	}
	
	//Player
	player.update(binding);
	player.draw();

	//Update Hud
	fill("black");
	text("Health: " + player.health,10,10);
	text("Score: " + player.score,10,30);

	if(timer === 0) {
		enemies.push(new Enemy(1));
		timer = 200;
	}
	timer--;
}