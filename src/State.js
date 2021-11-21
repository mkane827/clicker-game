class State {
  constructor() {
    this.products = 0;
    this.designs = 0;
    this.linesOfCode_ = 0;
    this.money = 0;
    this.pm = 0;
    this.ux = 0;
    this.eng = 0;
    this.designTimeout;
    this.tickMultiplier_ = 1;
    this.revenueMultiplier = 1;
    this.maxEmployees_ = 10;
  }

  set linesOfCode(numLines) {
    this.linesOfCode_ = numLines;
  }

  get linesOfCode() {
    return this.linesOfCode_;
  }

  lowerTickMultiplier(diff) {
    this.tickMultiplier_ = Math.min(
      1,
      Math.max(0, this.tickMultiplier_ - diff)
    );
  }

  get tickspeed() {
    return 1500 * this.tickMultiplier_;
  }

  get numEmployees() {
    return this.eng + this.ux + this.pm;
  }

  get canAddMoreEmployees() {
    return this.numEmployees < this.maxEmployees_;
  }

  addLinesOfCode(numLines = 1) {
    this.linesOfCode_ += numLines;
  }
}

export default new State();
