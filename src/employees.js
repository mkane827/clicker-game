function nextEngCost() {
  return 10000 * eng * eng + 10000;
}

function checkEng() {
  EL.ENGINEER_BUTTON.disabled = money < nextEngCost();
}
