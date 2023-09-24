class Orbit {
  constructor(OBJECT_NAME, MEAN_MOTION, ECCENTRICITY, INCLINATION) {
    this.OBJECT_NAME = OBJECT_NAME;
    this.MUE = 3.986e5;
    this.EARTH_MASS = 5.972e24;
    this.EARTH_RADIUS = 6371;
    this.MEAN_MOTION = MEAN_MOTION;
    this.ECCENTRICITY = ECCENTRICITY;
    this.INCLINATION = INCLINATION;
    this.T = this.period_orbit();
    this.MEAN_MOTION_SI = this.mean_motion_si();
    this.SEMI_MAJOR_AXIS = this.semi_major_axis();
    this.SEMI_LATUS_RECTUM = this.semi_latus_rectum();
    this.TRUE_ANOMALY_LIST = this.true_anomaly();
    this.RADIAL_DISTANCE_LIST = this.radial_distance();
  }
  mean_motion_si() {
    return (2 * Math.PI) / this.T;
  }
  period_orbit() {
    return (1 / this.MEAN_MOTION) * 24 * 60 * 60;
  }
  radial_distance() {
    return this.TRUE_ANOMALY_LIST.map(
      (theta) =>
        this.SEMI_LATUS_RECTUM / (1 + this.ECCENTRICITY * Math.cos(theta))
    );
  }
  true_anomaly() {
    const n = 200;
    if (n <= 1) {
      return [0]; // Special case for n = 1
    }
    const step = (2 * Math.PI) / (n - 1);
    return Array.from({ length: n }, (_, i) => i * step);
  }

  semi_latus_rectum() {
    return this.SEMI_MAJOR_AXIS * (1 - this.ECCENTRICITY ** 2);
  }
  semi_major_axis() {
    return (this.MUE / this.MEAN_MOTION_SI ** 2) ** (1 / 3);
  }
  polar_to_cartesian(r, theta) {
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta) * Math.cos(this.INCLINATION);
    const z = r * Math.sin(theta) * Math.sin(this.INCLINATION);
    return [x, y, z];
  }
  plotOrbit() {
    //scale(0.01);
    stroke(255);
    //strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < this.TRUE_ANOMALY_LIST.length; i++) {
      const r = this.RADIAL_DISTANCE_LIST[i];
      const theta = this.TRUE_ANOMALY_LIST[i];
      const [x, y, z] = this.polar_to_cartesian(r, theta);
      //console.log(z);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}
