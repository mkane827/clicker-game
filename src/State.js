import { syncCustomerValue, syncMoneyValue } from "./elements";

class State {
  constructor() {
    this.products = 0;
    this.designs = 0;
    this.linesOfCode_ = 0;
    this.money_ = 0;
    this.pm = 0;
    this.ux = 0;
    this.eng_ = 0;
    this.designTimeout;
    this.tickMultiplier_ = 1;
    this.revenueMultiplier_ = 10;
    this.maxEmployees_ = 5;
    this.customers_ = 0;
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

  get money() {
    return this.money_;
  }

  loseMoney(amount = 0) {
    this.money_ -= amount;
    syncMoneyValue();
    return this.money;
  }

  spendMoney(...args) {
    return this.loseMoney(args);
  }

  makeMoney(amount = 0) {
    this.money_ += amount;
    syncMoneyValue();
    return this.money;
  }

  raiseRevenueMultiplier(amount = 0) {
    this.revenueMultiplier_ += amount;
  }

  lowerRevenueMultiplier(amount = 0) {
    this.revenueMultiplier_ -= amount;
  }

  makeMoneyFromCode() {
    return this.makeMoney(this.linesOfCode * this.revenueMultiplier_);
  }

  get nextEngCost() {
    return 10000 * Math.pow(this.eng_, 2) + 10000;
  }

  get canAffordNextEng() {
    return this.money >= this.nextEngCost;
  }

  hireEng(numToHire = 1) {
    this.eng_ += numToHire;
    return this.eng;
  }

  get eng() {
    return this.eng_;
  }

  addCustomers(newCustomers = 0) {
    this.customers_ += newCustomers;
    syncCustomerValue();
    return this.customers;
  }

  loseCustomers(newCustomers = 0) {
    this.customers_ -= newCustomers;
    syncCustomerValue();
    return this.customers;
  }

  get customers() {
    return this.customers_;
  }
}

export default new State();
