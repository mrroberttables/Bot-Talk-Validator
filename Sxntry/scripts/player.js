//Upgrades
// Beam width (angular)
// Beam length
// Beam speed
// Damage
// Heal
const PLAYER_WIDTH_LEVELS = [Math.PI/30, Math.PI/25, Math.PI/20, Math.PI/15, Math.PI/10];
const PLAYER_LENGTH_LEVELS = [200, 100, 200, 300];
const PLAYER_SPEED_LEVELS = [Math.PI/120, Math.PI/100, Math.PI/40, Math.PI/30, Math.PI/20];
const PLAYER_DAMAGE_LEVELS = [2,5,10,15,25];

class Player {
	x = 400
	y = 400;
	angle = 0;
	widthLevel = 0;
	lengthLevel = 0;
	speedLevel = 0;
	damageLevel = 0;
	health = 100;
	score = 0;

	constructor() {

	}

	damage(hp) {
		this.health -= hp;
	}

	addScore(points) {
		this.score += points;
	}

	update(bindings) {
		if(keyIsPressed) {
			let dir = 0;
			switch(keyCode) {
				case bindings.LEFT:
					dir--
					break;
				case bindings.RIGHT:
					dir++
					break;
			}

			this.angle += dir * PLAYER_SPEED_LEVELS[this.speedLevel];

			if(this.angle < 0) {
				this.angle += TWO_PI;
			}
			if(this.angle >= TWO_PI) {
				this.angle -= TWO_PI
			}
		}
	}

	draw() {
		push();
		fill(255);
		stroke(255);
		arc(this.x, this.y, PLAYER_LENGTH_LEVELS[this.lengthLevel]*2, PLAYER_LENGTH_LEVELS[this.lengthLevel]*2, this.angle - PLAYER_WIDTH_LEVELS[this.widthLevel], this.angle + PLAYER_WIDTH_LEVELS[this.widthLevel]);
		pop();
	}

	getRadius() {
		return PLAYER_LENGTH_LEVELS[this.lengthLevel];
	}

	getDamageDealt() {
		return PLAYER_DAMAGE_LEVELS[this.damageLevel];
	}

	getArcAngles() {
		return [this.angle - PLAYER_WIDTH_LEVELS[this.widthLevel], this.angle + PLAYER_WIDTH_LEVELS[this.widthLevel]];
	}

	addScore(val) {
		this.score += val;
	}
}

