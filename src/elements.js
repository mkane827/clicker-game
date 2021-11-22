import state from "./State";

const MONEY_VALUE = getEl(".money-value span");
const CUSTOMERS_VALUE = getEl(".customers-value span");

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

export function syncMoneyValue() {
  setNumText(MONEY_VALUE, state.money);
}

export function syncCustomerValue() {
  setNumText(CUSTOMERS_VALUE, state.customers);
}
