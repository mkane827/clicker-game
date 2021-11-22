import { getEl, setText } from "./elements";
import state from "./State";

export const ENGINEER_BUTTON = getEl("button.engineer");
export const JOB_POSTINGS_LIST = getEl(".job-postings");

export function checkEng() {
  ENGINEER_BUTTON.disabled =
    !state.canAffordNextEng || !state.canAddMoreEmployees;
}

export function exposeHeadOfSales() {
  const li = document.createElement("li");
  const button = document.createElement("button");
  setText(button, "Head of Sales ($20,000)");
  const disabledChecker = setInterval(
    () => (button.disabled = state.money < 20000),
    1
  );
  button.onclick = () => {
    state.addCustomers(10);
    li.remove();
    clearInterval(disabledChecker);
  };
  button.disabled = true;
  li.append(button);
  JOB_POSTINGS_LIST.append(li);
}
