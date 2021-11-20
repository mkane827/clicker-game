function nextEngCost() {
  return 10 * eng * eng + 10000;
}

function checkEng() {
  EL.ENGINEER_BUTTON.disabled = money < nextEngCost();
}
