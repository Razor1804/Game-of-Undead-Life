class Being {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.color = color(0);
    this.species = "BEING";
  }

  Display() {
    fill(this.color);
    rect(this.a * res, this.b * res, res - 1, res - 1);
  }

  get Species() {
    return this.species;
  }
}