const TICK_SPEED = 1500;
const DESIGNS_PER_FEATURE = 3;
const LINES_OF_CODE_PER_DESIGN = 120;
const SELECTOR = {
  NUM_PRODUCT_IDEAS: '.num-product-ideas',
  NUM_DESIGNS: '.num-designs',
  NUM_LINES_OF_CODE: '.num-lines-of-code',
  MONEY_VALUE: '.money-value span',
  PRODUCT_BUTTON: 'button.idea',
  DESIGN_BUTTON: 'button.design',
  CODE_BUTTON: 'button.code'
};
let products = 0;
let designs = 0;
let linesOfCode = 0;
let money = 0;
let pm = 0;
let ux = 0;
let eng = 0;
let designTimeout;

function getEl(selector) {
  return document.querySelector(selector);
}

function setText(selector, textContent) {
  return getEl(selector).textContent = textContent
}

function setNumText(selector, num) {
  return setText(selector, num.toLocaleString());
}

function setElDisabled(selector, isDisabled) {
  getEl(selector).disabled = isDisabled;
}

function addProduct() {
  products += 1 + pm;
  setNumText(SELECTOR.NUM_PRODUCT_IDEAS, products);
  setElDisabled(SELECTOR.PRODUCT_BUTTON, true);
  setElDisabled(SELECTOR.DESIGN_BUTTON, !!designTimeout)
  setTimeout(() => {
    setElDisabled(SELECTOR.PRODUCT_BUTTON, false);
  }, TICK_SPEED * products);
}

function addDesign() {
  if (designs < products * DESIGNS_PER_FEATURE) {
    designs += 1 + ux;
    setNumText(SELECTOR.NUM_DESIGNS, designs);
    setElDisabled(SELECTOR.DESIGN_BUTTON, true);
    setElDisabled(SELECTOR.CODE_BUTTON, false);
    if (designs < products * DESIGNS_PER_FEATURE) {
      designTimeout = setTimeout(() => {
        setElDisabled(SELECTOR.DESIGN_BUTTON, false);
        designTimeout = false;
      }, TICK_SPEED * designs / 3);
    }
  } else {
    setElDisabled(SELECTOR.DESIGN_BUTTON, true);
  }
}

function addCode() {
  if (linesOfCode < designs * LINES_OF_CODE_PER_DESIGN) {
    linesOfCode += 1 + eng;
    setNumText(SELECTOR.NUM_LINES_OF_CODE, linesOfCode);
  } else {
    setElDisabled(SELECTOR.CODE_BUTTON, true);
  }
}

setInterval(() => {
  money += linesOfCode;
  setNumText(SELECTOR.MONEY_VALUE, money);
}, TICK_SPEED);