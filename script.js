"use strict";

// DOM elements
const display = document.querySelector(".display");
const displayBtns = [...document.querySelectorAll(".display-btn")];
const numberBtns = [...document.querySelectorAll(".num-btn")];
const addBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");

// Input variables
let curNumber = "";
const numbers = [];
const operators = [];

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
  return a / b;
};

const operate = function (operator, a, b) {
  return operator(a, b);
};

const addToDisplay = function (e) {
  display.textContent += e.target.textContent;
};

const addNumber = function (e) {
  display.textContent += e.target.textContent;
  curNumber += e.target.textContent;
};

const addOperator = function (e) {
  display.textContent += e.target.textContent;
  operators.push();
  numbers.push(+curNumber);
  curNumber = "";
};

const clearDisplay = function () {
  display.textContent = "";
};

// Event listeners
displayBtns.forEach((btn) => btn.addEventListener("click", addToDisplay));

clearBtn.addEventListener("click", clearDisplay);
