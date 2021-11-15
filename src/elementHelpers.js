function getEl(selector) {
  return document.querySelector(selector);
}

function setText(selector, textContent) {
  return (getEl(selector).textContent = textContent);
}

function setNumText(selector, num) {
  return setText(selector, num.toLocaleString());
}

function setElDisabled(selector, isDisabled) {
  getEl(selector).disabled = isDisabled;
}
