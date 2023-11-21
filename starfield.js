/*
	Starfield lets you take a div and turn it into a starfield.

*/

//	Define the starfield class.
function Starfield() {
	this.fps = 30;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 30;
	this.maxVelocity = 50;
	this.stars = 100;
	this.intervalId = 0;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {
	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		var angle = 2 * Math.PI * Math.random();
		var x = Math.cos(angle);
		var y = Math.sin(angle);
		var velocity = (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity;
		stars[i] = new Star(
			x, y,
			Math.random()*3+1,
			velocity
		);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);

	// Skip 500 frames so stars start in random places.
	for (var i = 0; i < 500; i++) {
	    self.update();
	}
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;

	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.t += dt;
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		var x = star.x * star.t ** 2 * star.velocity;
		var y = star.y * star.t ** 2 * star.velocity;
		if(x < -0.5 * this.width || x > 0.5 * this.width || y > 0.5 * this.height || y < -0.5 * this.height) {
		var angle = 2 * Math.PI * Math.random();
		var x = Math.cos(angle);
		var y = Math.sin(angle);
		var velocity = (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity;
		this.stars[i] = new Star(
			x, y,
			Math.random()*3+1,
			velocity
		);
		}
	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length;i++) {
		var star = this.stars[i];
		var x = star.x * star.t ** 2 * star.velocity;
		var y = star.y * star.t ** 2 * star.velocity;
		var relX = Math.abs(2 * x / this.width) ** 1.2;
		var relY = Math.abs(2 * y / this.height)** 1.2;
    ctx.fillStyle = `rgb(
        ${Math.floor(relX * 255)},
        ${Math.floor(relY * 255)},
        10)`;
		ctx.fillRect(this.canvas.width * 0.5 + x, this.canvas.height * 0.5 + y, star.size, star.size);
	}
};

function Star(x, y, size, velocity) {
	this.x = x;
	this.y = y; 
	this.t = 0;
	this.size = size;
	this.velocity = velocity;
}
