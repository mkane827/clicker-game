let products = 0;
let designs = 0;
let linesOfCode = 0;
let money = 0;
let pm = 0;
let ux = 0;
let eng = 0;
let designTimeout;

function addProduct() {
  products += 1;
  setNumText(EL.NUM_PRODUCT_IDEAS, products);
  setElDisabled(EL.PRODUCT_BUTTON, true);
  setElDisabled(EL.DESIGN_BUTTON, !!designTimeout);
  setTimeout(() => {
    setElDisabled(EL.PRODUCT_BUTTON, false);
  }, TICK_SPEED * products);
}

function addDesign() {
  if (designs < products * DESIGNS_PER_FEATURE) {
    designs += 1;
    setNumText(EL.NUM_DESIGNS, designs);
    setElDisabled(EL.DESIGN_BUTTON, true);
    setElDisabled(EL.CODE_BUTTON, false);
    if (designs < products * DESIGNS_PER_FEATURE) {
      designTimeout = setTimeout(() => {
        setElDisabled(EL.DESIGN_BUTTON, false);
        designTimeout = false;
      }, (TICK_SPEED * designs) / 3);
    }
  } else {
    setElDisabled(EL.DESIGN_BUTTON, true);
  }
}

function addCode(newLines = 1) {
  if (linesOfCode < designs * LINES_OF_CODE_PER_DESIGN) {
    linesOfCode += newLines;
    setNumText(EL.NUM_LINES_OF_CODE, linesOfCode);
  } else {
    setElDisabled(EL.CODE_BUTTON, true);
  }
}

function addEngineer() {
  eng++;
}

setInterval(() => {
  money += linesOfCode;
  setNumText(EL.MONEY_VALUE, money);
  addCode(eng);
}, TICK_SPEED);
