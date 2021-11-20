import {
  TICK_SPEED,
  DESIGNS_PER_FEATURE,
  LINES_OF_CODE_PER_DESIGN,
} from "./src/constants";
import { setElDisabled, setNumText } from "./src/elements";
import {
  NUM_PRODUCT_IDEAS,
  PRODUCT_BUTTON,
  DESIGN_BUTTON,
  NUM_DESIGNS,
  CODE_BUTTON,
  NUM_LINES_OF_CODE,
  NUM_ENG,
  NEXT_ENG_COST,
  ENG_COUNTER,
  MONEY_VALUE,
} from "./src/elements";
import { checkEng, nextEngCost } from "./src/employees";
import state from "./src/State";
import { ACTIVITIES, addActivity } from "./src/activityTracker";

window.addProduct = function () {
  state.products += 1;
  setNumText(NUM_PRODUCT_IDEAS, state.products);
  setElDisabled(PRODUCT_BUTTON, true);
  setElDisabled(DESIGN_BUTTON, !!state.designTimeout);
  setTimeout(() => {
    setElDisabled(PRODUCT_BUTTON, false);
  }, TICK_SPEED * state.products);

  if (state.products === 1) {
    addActivity(ACTIVITIES.FIRST_PRODUCT);
  }
};

window.addDesign = function () {
  if (state.designs < state.products * DESIGNS_PER_FEATURE) {
    state.designs += 1;
    setNumText(NUM_DESIGNS, state.designs);
    setElDisabled(DESIGN_BUTTON, true);
    setElDisabled(CODE_BUTTON, false);
    if (state.designs < state.products * DESIGNS_PER_FEATURE) {
      state.designTimeout = setTimeout(() => {
        setElDisabled(DESIGN_BUTTON, false);
        state.designTimeout = false;
      }, (TICK_SPEED * state.designs) / 3);
    }
  } else {
    setElDisabled(DESIGN_BUTTON, true);
  }

  if (state.designs === 1) {
    addActivity(ACTIVITIES.FIRST_DESIGN);
  }
};

window.addCode = function (newLines = 1) {
  const maxLines = state.designs * LINES_OF_CODE_PER_DESIGN;
  // babel minify not working with Math.min... annoying
  state.linesOfCode = Math.min(state.linesOfCode + newLines, maxLines);
  setNumText(NUM_LINES_OF_CODE, state.linesOfCode);

  if (state.linesOfCode === maxLines) {
    setElDisabled(CODE_BUTTON, true);
  }
};

window.addEngineer = function () {
  state.money -= nextEngCost();
  setNumText(NUM_ENG, ++state.eng);
  setNumText(NEXT_ENG_COST, nextEngCost());
  showEl(ENG_COUNTER);
  checkEng();
};

setInterval(() => {
  state.money += state.linesOfCode;
  setNumText(MONEY_VALUE, state.money);
  addCode(state.eng);
  checkEng();
}, TICK_SPEED);
