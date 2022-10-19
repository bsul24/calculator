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
const deleteBtn = document.querySelector(".delete-btn");
const percentBtn = document.querySelector(".percent-btn");
const signBtn = document.querySelector(".sign-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const allBtns = [...document.querySelectorAll("button")];

// State
const state = {
  stored: "",
  tempStored: "",
  operator: "",
  lastKeyPressed: "",
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
  removeOperatorHighlights();

  const number = e.target.textContent;
  if (display.textContent === "0" || state.lastKeyPressed === "operator") {
    display.textContent = number;
  } else if (state.lastKeyPressed === "equals") {
    display.textContent = number;
    state.stored = "";
  } else {
    display.textContent += number;
  }

  state.lastKeyPressed = "number";
};

const handleDecimal = function () {
  if (
    state.lastKeyPressed === "operator" ||
    state.lastKeyPressed === "equals"
  ) {
    if (state.lastKeyPressed === "equals") state.stored = "";
    display.textContent = "0.";
    state.lastKeyPressed = "decimal";
    return;
  }

  const displayValue = display.textContent;
  for (let i = 0; i < displayValue.length; i++) {
    if (displayValue[i] === ".") return;
  }
  state.lastKeyPressed = "decimal";
  display.textContent += ".";
};

const handleOperator = function (e) {
  removeOperatorHighlights();
  if (
    state.stored &&
    state.lastKeyPressed !== "operator" &&
    state.lastKeyPressed !== "equals"
  ) {
    const result = operate(state.operator, state.stored, +display.textContent);
    display.textContent = result;
  }
  if (state.lastKeyPressed !== "equals") {
    state.stored = +display.textContent;
  }

  state.lastKeyPressed = "operator";
  const button = e.target;

  if (button === addBtn) {
    state.operator = add;
    addBtn.classList.add("selected");
  }
  if (button === subtractBtn) {
    state.operator = subtract;
    subtractBtn.classList.add("selected");
  }
  if (button === multiplyBtn) {
    state.operator = multiply;
    multiplyBtn.classList.add("selected");
  }
  if (button === divideBtn) {
    state.operator = divide;
    divideBtn.classList.add("selected");
  }
};

const handleDelete = function () {
  if (display.textContent === "0" || display.textContent === "-0") return;

  if (state.lastKeyPressed === "operator") {
    display.textContent = "0";
  } else if (state.lastKeyPressed === "equals") {
    display.textContent = "0";
    state.stored = "";
  } else if (
    +display.textContent >= -9 &&
    +display.textContent <= 9 &&
    Number.isInteger(+display.textContent) &&
    display.textContent.slice(-1) !== "."
  ) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }

  state.lastKeyPressed = "delete";
};

const handleEquals = function () {
  if (state.stored === "") return;

  if (state.lastKeyPressed === "equals") {
    const result = operate(state.operator, state.stored, state.tempStored);
    state.stored = result;
    display.textContent = result;
    return;
  }

  const result = operate(state.operator, state.stored, +display.textContent);
  state.stored = result;
  state.tempStored = +display.textContent;
  display.textContent = result;
  state.lastKeyPressed = "equals";
};

const handleClear = function () {
  state.stored = "";
  state.tempStored = "";
  state.operator = "";
  state.lastKeyPressed = "clear";
  display.textContent = "0";
  removeOperatorHighlights();
};

const removeOperatorHighlights = function () {
  operatorBtns.forEach((btn) => {
    btn.classList.remove("selected");
    btn.classList.remove("mousedown");
  });
};

// Event listeners
numberBtns.forEach((btn) => btn.addEventListener("click", handleNumber));
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperator));
operatorBtns.forEach((btn) =>
  btn.addEventListener("mousedown", function () {
    this.classList.add("mousedown");
  })
);
deleteBtn.addEventListener("click", handleDelete);
equalBtn.addEventListener("click", handleEquals);
clearBtn.addEventListener("click", handleClear);
decimalBtn.addEventListener("click", handleDecimal);
