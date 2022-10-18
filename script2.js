"use strict";

// DOM elements
const display = document.querySelector(".display");
const numberBtns = [...document.querySelectorAll(".num-btn")];
const decimalBtn = document.querySelector(".decimal-btn");
const operatorBtns = [...document.querySelectorAll(".operator-btn")];
const addBtn = document.querySelector(".add-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const multiplyBtn = document.querySelector(".multiply-btn");
const divideBtn = document.querySelector(".divide-btn");
const percentBtn = document.querySelector(".percent-btn");
const signBtn = document.querySelector(".sign-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const allBtns = [...document.querySelectorAll("button")];

// State
const state = {
  stored: "",
  operator: "",
  lastButtonOperator: false,
};

// Functions
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b === 0) {
    clearDisplay();
    isError = true;
    return "Error";
  }
  return a / b;
};

const operate = function (operator, a, b) {
  return operator(a, b);
};

const handleNumber = function (e) {
  const number = e.target.textContent;
  if (display.textContent === "0") {
    display.textContent = number;
  } else {
    display.textContent += number;
  }
};

const handleDecimal = function () {
  const displayValue = display.textContent;
  for (let i = 0; i < displayValue.length; i++) {
    if (displayValue[i] === ".") return;
  }

  display.textContent += ".";
};

const handleOperator = function (e) {
  operatorBtns.forEach((btn) => btn.classList.remove("selected"));
  const button = e.target;
  if (button === addBtn) {
    state.operator = add;
    addBtn.classList.add("selected");
  }
  if (button === addBtn) {
    state.operator = add;
    addBtn.classList.add("selected");
  }
  if (button === addBtn) {
    state.operator = add;
    addBtn.classList.add("selected");
  }
  if (button === addBtn) {
    state.operator = add;
    addBtn.classList.add("selected");
  }
};

const handleEquals = function () {
  if (!state.operator || !state.stored || !state.displayValue) return;
  state.displayValue = operate(
    state.operator,
    state.stored,
    +state.displayValue
  );
  display.textContent = state.displayValue;
};

const handleClear = function () {
  state.displayValue = "";
  state.stored = "";
  state.operator = "";
  display.textContent = "0";
};

// Event listeners
numberBtns.forEach((btn) => btn.addEventListener("click", handleNumber));
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperator));
equalBtn.addEventListener("click", handleEquals);
clearBtn.addEventListener("click", handleClear);
decimalBtn.addEventListener("click", handleDecimal);
