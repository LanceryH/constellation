let bg;
var zoom = 0.004;
var zMin = 0.00001;
var zMax = 1.0;
var sensativity = 0.000005;

function preload() {
  data = loadJSON("data.json");
  map_earth = loadImage("map_earth.jpg");
}

let list_object = [];

function setup() {
  earth = new CelestialBody(
    "Earth",
    loadImage("map_earth.jpg"),
    5.972e24,
    6371
  );
  //sky = new CelestialBody("Sky", loadImage("map_star.jpg"), 0, 80e4);
  createCanvas(windowWidth, windowHeight, WEBGL);
  console.log(data[0]);
  for (let index = 80; index < 100; index++) {
    list_object.push(
      new Orbit(
        data[index].OBJECT_NAME,
        data[index].MEAN_MOTION,
        data[index].ECCENTRICITY,
        data[index].INCLINATION,
        data[index].NUE
      )
    );
  }
}

function draw() {
  background(0);
  //orbitControl();
  orbitControl(1, 1, 0);
  scale(zoom);
  //rotateY(millis() / 100);
  //sky.show();
  rotateY(millis() / 10000);
  rotateX(millis() / 10000);
  earth.show();
  for (let index = 0; index < list_object.length; index++) {
    strokeWeight(1);
    list_object[index].plotOrbit();
  }
}

function mouseWheel(event) {
  zoom -= sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === "s") {
    saveGif("mySketch", 3);
  }
}
