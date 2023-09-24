class CelestialBody {
  constructor(name, map, mass, radius) {
    this.name = name;
    this.map = map;
    this.mass = mass;
    this.radius = radius;
  }
  show() {
    stroke(255, 255, 0);
    strokeWeight(0);
    texture(this.map);
    sphere(this.radius, 24, 24);
  }
}
