class CelestialBody {
  constructor(name, map, mass, radius) {
    this.name = name;
    this.map = map;
    this.mass = mass;
    this.radius = radius;
  }
  show() {
    strokeWeight(0);
    texture(this.map);
    sphere(this.radius, 24, 24);
  }
  show_north_south() {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(0, -this.radius * 1.5, 0, 0);
    stroke(0, 0, 255);
    strokeWeight(1);
    line(0, 0, 0, this.radius * 1.5);
  }
}
