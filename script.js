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
    return "Error";
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

  if (typeof num1 !== "number" && !curNumber) return;

  if (typeof num1 !== "number" && curNumber) {
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

const handlePercent = function () {
  if (!display.textContent) return;

  if (typeof num1 !== "number" || curNumber) {
    curNumber = +curNumber / 100;
    display.textContent = curNumber;
    return;
  }

  num1 /= 100;
  display.textContent = +display.textContent / 100;
};

const handleSignChange = function () {
  if (typeof num1 !== "number" || (curNumber && curNumber !== "-")) {
    curNumber = +curNumber * -1;
    display.textContent = curNumber;
    return;
  }

  if (equalPressed) {
    num1 *= -1;
    display.textContent = num1;
    return;
  }

  if (!curNumber) {
    curNumber = "-";
    display.textContent = "-";
    return;
  }

  if (curNumber === "-") {
    curNumber = "";
    display.textContent = "0";
    return;
  }

  num1 *= -1;
  display.textContent = +display.textContent * -1;
};

const handleEquals = function () {
  if (typeof num1 !== "number" || isError) return;

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
  num1 = null;
  num2 = null;
  operator = null;
};

const trimDisplayLength = function () {
  if (Math.abs(+display.textContent) === Infinity) {
    display.textContent = "Error";
    return;
  }
  if (+display.textContent > Number.MAX_SAFE_INTEGER) {
    display.textContent = BigInt(+display.textContent);
  }
  if (+display.textContent < 999999999) {
    let displayNumbers = 0;
    for (let i = 0; i < display.textContent.length; i++) {
      if (typeof +display.textContent[i] === "number") {
        displayNumbers++;
      }
    }
    if (displayNumbers < 10) return;
    display.textContent = display.textContent.slice(0, 10);
  }
  if (+display.textContent > 999999999) {
    const scientific = (+display.textContent).toExponential();
    if (scientific.length < 11) {
      const plus = scientific.indexOf("+");
      const scientificNoPlus =
        scientific.slice(0, plus) + scientific.slice(plus + 1);
      display.textContent = scientificNoPlus;
      return;
    }
    const e = scientific.indexOf("e");
    const decimals = 9 - scientific.slice(e).length;
    const newScientific =
      (+scientific.slice(0, e)).toFixed(decimals) + scientific.slice(e);
    const plus = newScientific.indexOf("+");
    const newScientificNoPlus =
      newScientific.slice(0, plus) + newScientific.slice(plus + 1);
    display.textContent = newScientificNoPlus;
    // display.textContent =
    //   Math.round(+scientific.slice(0, 7)) + scientific.slice(e);
  }
};

// Event listeners
numberBtns.forEach((btn) => btn.addEventListener("click", handleNumber));
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperator));
percentBtn.addEventListener("click", handlePercent);
signBtn.addEventListener("click", handleSignChange);
equalBtn.addEventListener("click", handleEquals);
clearBtn.addEventListener("click", clearDisplay);
