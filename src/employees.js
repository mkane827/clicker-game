import { getEl } from "./elements";
import state from "./State";

export const ENGINEER_BUTTON = getEl("button.engineer");

export function nextEngCost() {
  return 10000 * state.eng * state.eng + 10000;
}

export function checkEng() {
  ENGINEER_BUTTON.disabled =
    state.money < nextEngCost() || !state.canAddMoreEmployees;
}
