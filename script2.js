"use strict";

// DOM elements
const display = document.querySelector(".display");
const displayBtns = [...document.querySelectorAll(".display-btn")];
const numberBtns = [...document.querySelectorAll(".num-btn")];
const decimalBtn = document.querySelector(".decimal-btn");
const operatorBtns = [...document.querySelectorAll(".operator-btn")];
const percentBtn = document.querySelector(".percent-btn");
const signBtn = document.querySelector(".sign-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const allBtns = [...document.querySelectorAll("button")];

// State
const state = {
  displayValue: "",
  stored: "",
  operator: "",
  lastButtonPressed: "",
};
// Last button options: number, clear, decimal, back, percent, sign, operator, equal, ''
// let curNumber = "";
// let num1;
// let num2;
// let operator;
// let equalPressed = false;
// let isError = false;

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
  state.displayValue += number;
  display.textContent = state.displayValue;
};

const handleOperator = function (e) {
  const button = e.target.textContent;
  state.stored = +state.displayValue;
  state.displayValue = "";
  if (button === "+") state.operator = add;
  if (button === "-") state.operator = subtract;
  if (button === "×") state.operator = multiply;
  if (button === "÷") state.operator = divide;
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
