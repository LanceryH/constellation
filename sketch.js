let bg;
var zoom = 0.03;
var zMin = 0.00001;
var zMax = 1.0;
var sensativity = 0.00005;

function preload() {
  data = loadJSON("data.json");
  map_earth = loadImage("map_earth.jpg");
}

let list_object_2 = {};
let list_object = [];

function setup() {
  console.log(Object.keys(data).length);
  earth = new CelestialBody(
    "Earth",
    loadImage("map_earth.jpg"),
    5.972e24,
    6371
  );
  checkbox = createCheckbox("show poles", false);
  checkbox.elt.style = "color: white;";
  //checkbox.elt.style.margin = "3px 3px 3px 4px;";
  checkbox.position(10, 40);

  sel = createSelect();
  //sky = new CelestialBody("Sky", loadImage("map_star.jpg"), 0, 80e4);
  createCanvas(windowWidth, windowHeight, WEBGL);

  console.log(data[0]);
  for (let index = 0; index < 200; index++) {
    sel.position(10, 10);
    sel.option(data[index].OBJECT_NAME);
    sel.changed(mySelectEvent_listbox);
    list_object_2[data[index].OBJECT_NAME] = new Orbit(
      data[index].OBJECT_NAME,
      data[index].MEAN_MOTION,
      data[index].ECCENTRICITY,
      data[index].INCLINATION,
      data[index].NUE
    );
  }
}

function mySelectEvent_listbox() {
  let item = sel.value();
  list_object_2[item].plotOrbit();
  console.log(list_object_2[item]);
}

function draw() {
  background(0);
  //orbitControl();
  orbitControl(1, 1, 0);
  scale(zoom);

  //sky.show();
  strokeWeight(1);
  stroke(255);
  rotateY(0);
  list_object_2[sel.value()].plotOrbit();

  strokeWeight(1);
  stroke(255);
  texture(map_earth);
  rotateY(millis() / 10000);
  earth.show();

  vals = list_object_2[sel.value()].calculateFootprint();

  if (checkbox.checked()) {
    earth.show_north_south();
  }
}

function mouseWheel(event) {
  zoom -= sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}
