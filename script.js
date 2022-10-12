"use strict";

// DOM elements
const display = document.querySelector(".display");
const displayBtns = [...document.querySelectorAll(".display-btn")];
const numberBtns = [...document.querySelectorAll(".num-btn")];
const operatorBtns = [...document.querySelectorAll(".operator-btn")];
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");

// Input variables
let curNumber = "";
let num1;
let num2;
let operator;
let equalPressed = false;
let isError = false;

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
    return "ERR: divide by 0";
  }
  return a / b;
};

const operate = function () {
  return operator(num1, num2);
};

const addToDisplay = function (e) {
  display.textContent += e.target.textContent;
  trimDisplayLength();
};

const handleNumber = function (e) {
  isError = false;
  if (equalPressed) {
    clearDisplay();
    equalPressed = false;
  }
  if (curNumber.length > 8) return;
  curNumber += e.target.textContent;
  display.textContent = +curNumber;
};

const handleOperator = function (e) {
  if (isError) return;

  if (!num1 && !curNumber) return;

  if (!num1 && curNumber) {
    num1 = +curNumber;
    curNumber = "";
  } else if (num1 && curNumber) {
    num2 = +curNumber;
    displayResult();
  }

  equalPressed = false;

  if (e.target.textContent === "+") operator = add;
  if (e.target.textContent === "-") operator = subtract;
  if (e.target.textContent === "*") operator = multiply;
  if (e.target.textContent === "/") operator = divide;
};

const handleEquals = function () {
  if (!num1 || isError) return;

  if (curNumber) num2 = +curNumber;

  displayResult();

  equalPressed = true;
};

const displayResult = function () {
  const result = operate();
  display.textContent = result;
  trimDisplayLength();
  num1 = result;
  curNumber = "";
};

const clearDisplay = function () {
  display.textContent = "0";
  curNumber = "";
  num1 = 0;
  num2 = 0;
  operator = 0;
};

const trimDisplayLength = function () {
  // display.textContent = display.textContent.slice(0, 10);
  if (Math.abs(+display.textContent) === Infinity) {
    display.textContent = "Error";
    return;
  }
  if (+display.textContent > Number.MAX_SAFE_INTEGER) {
    display.textContent = BigInt(+display.textContent);
  }
  if (+display.textContent > 999999999) {
    const scientific = (+display.textContent).toExponential();
    const e = scientific.indexOf("e");
    display.textContent = scientific.slice(0, 7) + scientific.slice(e);
  }
};

// Event listeners
// displayBtns.forEach((btn) => btn.addEventListener("click", addToDisplay));
numberBtns.forEach((btn) => btn.addEventListener("click", handleNumber));
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperator));
equalBtn.addEventListener("click", handleEquals);
clearBtn.addEventListener("click", clearDisplay);
