export const NUM_PRODUCT_IDEAS = getEl(".num-product-ideas");
export const NUM_DESIGNS = getEl(".num-designs");
export const NUM_LINES_OF_CODE = getEl(".num-lines-of-code");
export const NUM_ENG = getEl(".num-eng");
export const ENG_COUNTER = getEl(".eng-counter");
export const MONEY_VALUE = getEl(".money-value span");
export const CUSTOMERS_VALUE = getEl(".customers-value span");
export const NEXT_ENG_COST = getEl(".next-eng-cost");
export const ACTIVITY_TRACKER = getEl(".activity-tracker");

export function getEl(selector) {
  return document.querySelector(selector);
}

export function setText(el, textContent) {
  el.textContent = textContent;
  return el;
}

export function setNumText(el, num) {
  return setText(el, num.toLocaleString());
}

export function setElDisabled(el, isDisabled) {
  el.disabled = isDisabled;
  return el;
}

export function showEl(el) {
  el.classList.remove("hidden");
  return el;
}

export function hideEl(el) {
  el.classList.add("hidden");
  return el;
}
