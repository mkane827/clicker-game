import { COFOUNDERS_AVAILABLE_LINES_OF_CODE } from "./constants";
import { getEl, setText, setNumText } from "./elements";
import state from "./State";

const BOARD = getEl(".scrum-board");

function addToBoard({
  name,
  cost,
  description,
  action = () => {},
  isEquity,
  isDisabled = () => true,
  shouldAppear = () => false,
}) {
  const li = document.createElement("li");
  const button = document.createElement("button");

  const nameEl = document.createElement("div");
  nameEl.classList.add("name");
  setText(nameEl, name);

  const costEl = document.createElement("span");
  costEl.classList.add("cost");
  if (isEquity) {
    costEl.classList.add("equity");
  }
  setNumText(costEl, cost);

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
  name: "GET TWO COFOUNDERS",
  cost: 66,
  description:
    "Get work done faster and split equity equally between all three cofounders",
  action: () => state.lowerTickMultiplier(0.3),
  isEquity: true,
  isDisabled: () => state.money < 100,
  shouldAppear: () => state.linesOfCode >= COFOUNDERS_AVAILABLE_LINES_OF_CODE,
});

// addToBoard({
//   name: "RANK HIGH ON PRODUCT HUNT",
//   cost: 0,
//   description: "Gain 1,500 visits to your company site and  236 new users",
//   action: () => {},
//   // isDisabled: () => {},
// });
