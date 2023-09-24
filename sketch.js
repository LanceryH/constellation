let bg;

function setup() {
	earth = new CelestialBody("Earth",loadImage('map_earth.jpg'), 5.972e24, 6371, 149.6e6, 0.0167, 0, 0, 0, 0);
	moon = new CelestialBody("Moon",loadImage('map_moon.jpg'), 7.34767309e22, 1737.1, 384400, 0.0549, 5.145, 125.08, 318.15, 0);
	sky = new CelestialBody("Sky",loadImage('map_star.jpg'), 0, 100000, 0, 0, 0, 0, 0, 0);
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
	//imageMode(CENTER);
	// put setup code here
	//cam = createCamera();
	//cam.setPosition(0, 0, 0);

}

function draw() {
	background(0);
	orbitControl();
	//rotateY(millis() / 100);
	sky.show();
	moon.show();
	// put drawing code here
}
