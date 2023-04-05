class Enemy {
	healthScalar = 10;
	healthMin = 5;
	speedScalar = 5;
	speedMin = 3;
	image;

	health = 0
	speed = 0;
	strength = 10;
	x = 0;
	y = 0;
	deltaX;
	deltaY;

	constructor(difficulty) {
		//this.image = image;

		this.health = Math.floor(Math.random() * (difficulty * this.healthScalar)) + this.healthMin;
		this.speed = Math.floor(Math.random() * (difficulty * this.speedScalar)) + this.speedMin;

		const positionRand = Math.floor(Math.random() * (length - 75));
		const positionEdge = Math.round(Math.random()) * (length - 75);
		if(Math.random() < 0.5) {
			this.x = positionRand;
			this.y = positionEdge
		}
		else {
			this.y = positionRand;
			this.x = positionEdge;
		}

		const vectorLength = (Math.sqrt((((length/2) - this.x) * ((length/2) - this.x)) + (((length/2) - this.y)*((length/2) - this.y))));
		this.deltaX = (((length/2) - this.x) / vectorLength) * this.speed;
		this.deltaY = (((length/2) - this.y) / vectorLength) * this.speed;
	}

	update() {
		this.x += this.deltaX;
		this.y += this.deltaY;
	}

	draw() {
		//drawingContext.drawImage(this.image,this.x-36,this.y-36);
		push()
		noStroke()
		fill(253,0,155);
		//Top circle
		arc(this.x, this.y-20,32,32,-PI,0);
		//Middle rectangle
		rect(this.x-16,this.y-20,32,32);
		//Left tentacle
		rect(this.x-16,this.y+12,6,12);
		arc(this.x-13,this.y+24,6,6,0,PI);
		//middle tentacle
		rect(this.x-3,this.y+12,6,18);
		arc(this.x,this.y+30,6,6,0,PI);
		//right tentacle
		rect(this.x+10,this.y+12,6,12);
		arc(this.x+13,this.y+24,6,6,0,PI);

		//Draw the face
		stroke(255);
		strokeWeight(2);
		//Left eye
		line(this.x-10,this.y-24,this.x-4,this.y-18);
		line(this.x-10,this.y-18,this.x-4,this.y-24);
		//Right Eye
		line(this.x+10,this.y-24,this.x+4,this.y-18);
		line(this.x+10,this.y-18,this.x+4,this.y-24);
		//Smile
		curve(this.x-6,this.y+24,this.x-10,this.y-8, this.x+10,this.y-8  ,this.x+6,this.y+24);

		//Bounding Box - Comment Out When Done
		stroke(127);
		strokeWeight(5);
		point(this.x,this.y);
		point(this.x-16,this.y-36);
		point(this.x+16,this.y-36);
		point(this.x-16,this.y+36);
		point(this.x+16,this.y+36);
		
		pop();
	}

	collisionCheck(player) {
		const checkX = Math.max(this.x-16, Math.min(player.x,this.x+16));
		const checkY = Math.max(this.y-36, Math.min(player.y,this.y+36));

		const distance = Math.sqrt((checkX - player.x)*(checkX - player.x) + (checkY - player.y)*(checkY - player.y));

		//Add in angle check
		const theta = findAngle(player.x,player.y,this.x,this.y);
		const playerArc = player.getArcAngles();

		const isWithinAngle = (theta > playerArc[0] && theta < playerArc[1]) || (theta - TWO_PI > playerArc[0] && theta - TWO_PI < playerArc[1]);

		return isWithinAngle && (distance < player.getRadius());
	}

	damage(amount) {
		this.health -= amount;
	}

	getHealth() {
		return this.health;
	}
}

function findAngle(px, py, tx, ty)
{
	var dx;
	var dy;

	dx = tx - px;
	dy = ty - py;

	if (dx == 0)
	{
		theta = 0.0;
	}
	else
	{
		theta = Math.atan2(dy,dx);
	}

	//If theta is less than zero map [-PI,0] -> [PI,TWO_PI]
	if(theta < 0) {
		theta = TWO_PI + theta;
	}

	return theta;
}