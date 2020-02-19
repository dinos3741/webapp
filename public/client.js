// define the canvas dimensions and number of bubbles, and all elements in the page:
const width = 600;
const height = 400;
const num_bubbles = 20;
var bgcolor;
var button;
var slider;
var nameP;

// objects that hold the html elements:
var canvas;
var h1; 
var text_field;

// we initialize all objects here
function setup() {
	// create the drawing canvas:
	canvas = createCanvas(width, height);

	// set the initial grey background color:
	bgcolor = color(200);

	// create an empty paragraph for styling:
	createP(' ');

	// create a change color button:
	button = createButton("Change Background Color");
	// attach a callback function called mousePressed to the button object and run the function
	// changeColor to change the background color:
	//button.mousePressed(changeColor); -> this is the old way to create callbacks.
	// callback function to randomly change the background color:
	//function changeColor() {
	//	bgcolor = color(random(255), random(255), random(255));
	//}

	// this is the way with an anonymous callback function inline:
	button.mousePressed( function () { bgcolor = color(random(255), random(255), random(255)); });

	// create a slider to control the bubble size:
	slider = createSlider(10, 100, 40); // min, max and starting values

	// create text in a paragraph:
	nameP = createP('This is my canvas where I draw stuff');
	// create inline callbacks (new syntax) to change it with a mouseOver and mouseOut events:
	nameP.mouseOver( () =>  nameP.html('your mouse is over me!') );
	nameP.mouseOut( () =>  nameP.html('This is my canvas where I draw stuff') );

	createP(' ');

	// create a text field:
	text_field = createInput('Type a phrase here');

	// create an h1 tag:
	h1 = createElement('h1', 'Waiting for a click:');

	// create an empty array of bubles:
	bubbles = [];

	// create new bubbles objects in random locations:
	for (let i = 0; i < num_bubbles; i++) {
		bubbles[i] = new Bubble(random(width), random(height), random(1,5), random(1,5), 40);
	}
}

// global mousePressed function gets activated everytime the mouse is clicked anywhere:
function mousePressed() {
	// change the h1 tag text and display random numbers one per paragraph:
	h1.html("Now showing random numbers:");
	createP("My favourite number is: " + random(0, 10));
}

// function "draw" loops automatically - no need to call it
function draw() {
	// set the background color:
	background(bgcolor);

	// write text on the canvas taking input from the text field:
	text(text_field.value(), 10, 20);

	// make bubbles move:
	for (b of bubbles) {
		b.move();
		b.show();
		b.borders();
		b.rollover(mouseX, mouseY);
	}

	// move the h1 tag randomly:
	//h1.position(random(-3, 3), 200);
}

class Bubble {
	constructor(x, y, velx, vely, r) {
		this.x = x;
		this.y = y;
		this.velx = velx;
		this.vely = vely;
		this.r = r;
	}

	// moves the bubble to the new position of the center
	move() {
		// random trembling move:
		//this.x += random(-3, 3);
		//this.y += random(-3, 3);
		this.x += this.velx;
		this.y += this.vely;
	}

	borders() {
		if (this.x + this.r > width || this.x - this.r < 0) {
			this.velx *= -1;
		}
		if (this.y + this.r > height || this.y - this.r < 0) {
			this.vely *= -1;
		}
	}

	// displays the bubbles
	show() {
		noStroke(); // no around line
		fill(200, 67, 78, 100);  // fill color
		// creates the circle with center and variable radius depending on the slider:
		ellipse(this.x, this.y, slider.value());
	}

	// check if mouse is clicked inside:
	rollover(px, py) {
		// distance between the mouse pointer and the center of the circle:
		let d = dist(px, py, this.x, this.y);
		// if distance less than radius means mouse inside the circle:
		if (d < this.r) {
			// change the circle color:
			fill(243, 134, 156);
			ellipse(this.x, this.y, this.r);
		}
	}

}
