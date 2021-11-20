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
  }

  set linesOfCode(numLines) {
    this.linesOfCode_ = numLines;
  }

  get linesOfCode() {
    return this.linesOfCode_;
  }

  addLinesOfCode(numLines = 1) {
    this.linesOfCode_ += numLines;
  }
}

export default new State();
