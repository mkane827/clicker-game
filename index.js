import { DESIGNS_PER_FEATURE, LINES_OF_CODE_PER_DESIGN } from "./src/constants";
import {
  NUM_PRODUCT_IDEAS,
  NUM_DESIGNS,
  NUM_LINES_OF_CODE,
  NUM_ENG,
  NEXT_ENG_COST,
  ENG_COUNTER,
  MONEY_VALUE,
  setElDisabled,
  setNumText,
  getEl,
  showEl,
} from "./src/elements";
import { checkEng, nextEngCost, ENGINEER_BUTTON } from "./src/employees";
import state from "./src/State";
import { addActivity } from "./src/activityTracker";
import "./src/scrumBoard";

export const PRODUCT_BUTTON = getEl("button.idea");
export const DESIGN_BUTTON = getEl("button.design");
export const CODE_BUTTON = getEl("button.code");

let warnedOfCodeDisabled = false;

PRODUCT_BUTTON.onclick = function () {
  state.products += 1;
  setNumText(NUM_PRODUCT_IDEAS, state.products);
  setElDisabled(PRODUCT_BUTTON, true);
  setElDisabled(DESIGN_BUTTON, !!state.designTimeout);
  setTimeout(() => {
    setElDisabled(PRODUCT_BUTTON, false);
  }, state.tickspeed * Math.pow(state.products, 2));

  if (state.products === 1) {
    addActivity("Hello, Silicon Valley");
  }
};

DESIGN_BUTTON.onclick = function () {
  if (state.designs < state.products * DESIGNS_PER_FEATURE) {
    state.designs += 1;
    setNumText(NUM_DESIGNS, state.designs);
    setElDisabled(DESIGN_BUTTON, true);
    setElDisabled(CODE_BUTTON, false);
    if (state.designs < state.products * DESIGNS_PER_FEATURE) {
      state.designTimeout = setTimeout(() => {
        setElDisabled(DESIGN_BUTTON, false);
        state.designTimeout = false;
      }, state.tickspeed * state.designs);
    }
  } else {
    setElDisabled(DESIGN_BUTTON, true);
    addActivity("Uh oh! You ran out of ideas!");
  }

  if (state.designs === 1) {
    addActivity("Ooo that's pretty, you should build it!");
  }
};

function addCode(newLines = 1) {
  const maxLines = state.designs * LINES_OF_CODE_PER_DESIGN;
  state.linesOfCode = Math.min(state.linesOfCode + newLines, maxLines);
  setNumText(NUM_LINES_OF_CODE, state.linesOfCode);

  if (state.linesOfCode === maxLines) {
    setElDisabled(CODE_BUTTON, true);
    if (!warnedOfCodeDisabled && state.linesOfCode > 0) {
      addActivity("Uh oh! You ran out of designs to implement!");
      warnedOfCodeDisabled = true;
    }
  }
}

CODE_BUTTON.onclick = () => addCode(1);

ENGINEER_BUTTON.onclick = function () {
  state.money -= nextEngCost();
  setNumText(NUM_ENG, ++state.eng);
  setNumText(NEXT_ENG_COST, nextEngCost());
  showEl(ENG_COUNTER);
  checkEng();
};

function tick() {
  state.money += state.linesOfCode * state.revenueMultiplier;
  setNumText(MONEY_VALUE, state.money);
  addCode(state.eng);
  checkEng();
  setTimeout(tick, state.tickspeed);
}
tick();
