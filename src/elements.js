const EL = {
  NUM_PRODUCT_IDEAS: getEl(".num-product-ideas"),
  NUM_DESIGNS: getEl(".num-designs"),
  NUM_LINES_OF_CODE: getEl(".num-lines-of-code"),
  MONEY_VALUE: getEl(".money-value span"),
  PRODUCT_BUTTON: getEl("button.idea"),
  DESIGN_BUTTON: getEl("button.design"),
  CODE_BUTTON: getEl("button.code"),
  ENGINEER_BUTTON: getEl("button.engineer"),
};

function getEl(selector) {
  return document.querySelector(selector);
}

function setText(el, textContent) {
  return (el.textContent = textContent);
}

function setNumText(el, num) {
  return setText(el, num.toLocaleString());
}

function setElDisabled(el, isDisabled) {
  el.disabled = isDisabled;
}
