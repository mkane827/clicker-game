let products = 0;
let designs = 0;
let linesOfCode = 0;
let money = 0;
let pm = 0;
let ux = 0;
let eng = 0;
let designTimeout;

function addProduct() {
  products += 1 + pm;
  setNumText(SELECTOR.NUM_PRODUCT_IDEAS, products);
  setElDisabled(SELECTOR.PRODUCT_BUTTON, true);
  setElDisabled(SELECTOR.DESIGN_BUTTON, !!designTimeout);
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
      }, (TICK_SPEED * designs) / 3);
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
