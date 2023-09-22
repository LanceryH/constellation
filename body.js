class CelestialBody {
    constructor(name, map, mass, radius, semiMajorAxis, eccentricity, inclination, longitudeAscendingNode, argumentOfPeriapsis, meanAnomaly) {
        this.name = name;
        this.map = map;
        this.mass = mass;
        this.radius = radius;
        this.semiMajorAxis = semiMajorAxis;
        this.eccentricity = eccentricity;
        this.inclination = inclination;
        this.longitudeAscendingNode = longitudeAscendingNode;
        this.argumentOfPeriapsis = argumentOfPeriapsis;
        this.meanAnomaly = meanAnomaly;
        };
    show() {
        stroke(255,255,0);
        strokeWeight(0);
        texture(this.map);
        sphere(this.radius/100,50,50);        
    }
      }
    