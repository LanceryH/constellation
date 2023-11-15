let bg;
var zoom = 0.03;
var zMin = 0.00001;
var zMax = 1.0;
var sensativity = 0.00005;

function preload() {
  data_sat = loadJSON("data.json");
  map_earth = loadImage("map_earth.jpg");
}

let list_object = {};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //we create the objects
  earth = new CelestialBody(
    "Earth",
    loadImage("map_earth.jpg"),
    5.972e24,
    6371
  );

  //we create the checkbox
  checkbox = createCheckbox("show poles", false);
  checkbox.elt.style = "color: white;";
  checkbox.position(10, 40);

  //we create the listbox
  sel = createSelect();

  //we create the list of objects and insert them into the listbox
  for (let index = 0; index < 200; index++) {
    sel.position(10, 10);
    sel.option(data_sat[index].OBJECT_NAME);
    sel.changed(mySelectEvent_listbox);
    list_object[data_sat[index].OBJECT_NAME] = new Orbit(
      data_sat[index].OBJECT_NAME,
      data_sat[index].MEAN_MOTION,
      data_sat[index].ECCENTRICITY,
      data_sat[index].INCLINATION,
      data_sat[index].NUE
    );
  }
}

function mySelectEvent_listbox() {
  let item = sel.value();
  list_object[item].plotOrbit();
}

function draw() {
  background(0);
  orbitControl(1, 1, 0);
  scale(zoom);

  //sky.show();
  strokeWeight(1);
  stroke(255);
  rotateY(0);
  list_object[sel.value()].plotOrbit();
  list_object[sel.value()].calculateFootprint();

  strokeWeight(1);
  stroke(255);
  texture(map_earth);
  rotateY(millis() / 10000);
  //earth.show();

  if (checkbox.checked()) {
    earth.show_north_south();
  }
}

function mouseWheel(event) {
  zoom -= sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  return false;
}
