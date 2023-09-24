let bg;

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
  for (let index = 1; index < 50; index++) {
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
  orbitControl();
  scale(0.006);
  //rotateY(millis() / 100);
  //sky.show();
  earth.show();
  for (let index = 0; index < list_object.length; index++) {
    list_object[index].plotOrbit();
  }
}
