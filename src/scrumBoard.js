import { getEl, setText, setNumText } from "./elements";
import state from "./State";

const BOARD = getEl(".scrum-board");

/**
 *
 * @param p {{
 *  name: string,
 *  cost: string,
 *  description: string,
 *  action: () => {},
 *  isDisabled: () => {},
 *  shouldAppear: () => {},
 * }}
 */
export function addToBoard({
  name,
  cost,
  description,
  action = () => {},
  isDisabled = () => true,
  shouldAppear = () => true,
}) {
  const li = document.createElement("li");
  const button = document.createElement("button");

  const nameEl = document.createElement("div");
  nameEl.classList.add("name");
  setText(nameEl, name);

  const costEl = document.createElement("span");
  setText(costEl, cost);

  const descriptionEl = document.createElement("span");
  descriptionEl.classList.add("description");
  setText(descriptionEl, description);

  button.append(nameEl);
  button.append(costEl);
  button.append(descriptionEl);

  const isDisabledInterval = setInterval(() => {
    button.disabled = isDisabled();
  }, 1);

  button.onclick = () => {
    clearInterval(isDisabledInterval);
    li.remove();
    action();
  };
  li.append(button);

  const appearInterval = setInterval(() => {
    if (shouldAppear()) {
      BOARD.append(li);
      clearInterval(appearInterval);
    }
  }, 1);
}

addToBoard({
  name: "LEASE OFFICE SPACE",
  cost: "$25,000",
  description: "Find your first office space",
  action: () => {
    state.spendMoney(25000);
    state.addMaxEmployees(10);
  },
  isDisabled: () => state.money < 25000,
  shouldAppear: () => !state.canAddMoreEmployees,
});
