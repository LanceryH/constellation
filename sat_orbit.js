class Orbit {
  constructor(OBJECT_NAME, MEAN_MOTION, ECCENTRICITY, INCLINATION) {
    this.OBJECT_NAME = OBJECT_NAME;
    this.MUE = 3.986e5;
    this.EARTH_MASS = 5.972e24;
    this.EARTH_RADIUS = 6371;
    this.N = 100;
    this.MEAN_MOTION = MEAN_MOTION;
    this.ECCENTRICITY = ECCENTRICITY;
    this.INCLINATION = INCLINATION;
    this.PERIOD_ORBIT = this.period_orbit();
    this.MEAN_MOTION_SI = this.mean_motion_si();
    this.SEMI_MAJOR_AXIS = this.semi_major_axis();
    this.SEMI_LATUS_RECTUM = this.semi_latus_rectum();
    this.TRUE_ANOMALY_LIST = this.true_anomaly();
    this.RADIAL_DISTANCE_LIST = this.radial_distance();
    this.SPEED = this.speed();
  }
  speed() {
    return Math.sqrt((2 * this.MUE) / this.SEMI_LATUS_RECTUM);
  }
  mean_motion_si() {
    return (2 * Math.PI) / this.PERIOD_ORBIT;
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
    const step = (2 * Math.PI) / (this.N - 1);
    return Array.from({ length: this.N }, (_, i) => i * step);
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
    strokeWeight(1);
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < this.TRUE_ANOMALY_LIST.length; i++) {
      const r = this.RADIAL_DISTANCE_LIST[i];
      const theta = this.TRUE_ANOMALY_LIST[i];
      const [x, y, z] = this.polar_to_cartesian(r, theta);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
  calculateFootprint() {
    const footprint = [];
    strokeWeight(1);
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < this.TRUE_ANOMALY_LIST.length; i++) {
      const r = this.RADIAL_DISTANCE_LIST[i];
      const theta = this.TRUE_ANOMALY_LIST[i];
      const [x, y, z] = this.polar_to_cartesian(r, theta);

      // Calculate latitude and longitude from Cartesian coordinates
      const latitude = Math.asin(z / this.EARTH_RADIUS) * (180 / Math.PI);
      const longitude = Math.atan2(y, x) * (180 / Math.PI);

      footprint.push({ latitude, longitude });
      vertex(latitude * 10, longitude * 10);
    }
    endShape(CLOSE);
    return footprint;
  }
}
