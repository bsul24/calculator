"use strict";

// DOM elements
const display = document.querySelector(".display");
const operatorBtns = [...document.querySelectorAll(".operator-btn")];
const addBtn = document.querySelector(".add-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const multiplyBtn = document.querySelector(".multiply-btn");
const divideBtn = document.querySelector(".divide-btn");
const allBtns = [...document.querySelectorAll("button")];

// State
const state = {
  displayValue: "",
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

const removeOperatorHighlights = function () {
  operatorBtns.forEach((btn) => {
    btn.classList.remove("selected");
    btn.classList.remove("mousedown");
  });
};

const getButtonType = function (e) {
  if (e.target.classList.contains("num-btn")) return "number";
  if (e.target.classList.contains("decimal-btn")) return "decimal";
  if (e.target.classList.contains("operator-btn")) return "operator";
  if (e.target.classList.contains("delete-btn")) return "delete";
  if (e.target.classList.contains("sign-btn")) return "sign";
  if (e.target.classList.contains("percent-btn")) return "percent";
  if (e.target.classList.contains("equal-btn")) return "equals";
  if (e.target.classList.contains("clear-btn")) return "clear";
};

const createDisplayValue = function (e, buttonType) {
  if (buttonType === "number") {
    const number = e.target.textContent;
    if (display.textContent === "0" || state.lastKeyPressed === "operator") {
      return number;
    } else if (display.textContent === "-0") {
      return "-" + number;
    } else if (state.lastKeyPressed === "equals") {
      return number;
    } else {
      return display.textContent + number;
    }
  }

  if (buttonType === "decimal") {
    if (
      state.lastKeyPressed === "operator" ||
      state.lastKeyPressed === "equals"
    ) {
      return "0.";
    }

    const displayValue = display.textContent;
    for (let i = 0; i < displayValue.length; i++) {
      if (displayValue[i] === ".") return displayValue;
    }
    return display.textContent + ".";
  }

  if (buttonType === "operator") {
    if (
      state.stored &&
      state.lastKeyPressed !== "operator" &&
      state.lastKeyPressed !== "equals"
    ) {
      return operate(state.operator, state.stored, +display.textContent);
    }

    return display.textContent;
  }

  if (buttonType === "equals") {
    if (state.stored === "") return display.textContent;

    if (state.lastKeyPressed === "equals") {
      return operate(state.operator, state.stored, state.tempStored);
    }

    updateState(e);
    return operate(state.operator, state.stored, +display.textContent);
  }

  if (buttonType === "clear") {
    return (display.textContent = "0");
  }

  if (buttonType === "delete") {
    if (display.textContent === "0" || display.textContent === "-0")
      return display.textContent;

    if (
      state.lastKeyPressed === "operator" ||
      state.lastKeyPressed === "equals"
    ) {
      return "0";
    } else if (
      +display.textContent >= -9 &&
      +display.textContent <= 9 &&
      Number.isInteger(+display.textContent) &&
      display.textContent.slice(-1) !== "."
    ) {
      return "0";
    } else {
      return display.textContent.slice(0, -1);
    }
  }

  if (buttonType === "percent") {
    return +display.textContent / 100;
  }

  if (buttonType === "sign") {
    if (display.textContent[0] === "-") {
      return display.textContent.slice(1);
    } else {
      return "-" + display.textContent;
    }
  }
};

const trimDisplayValue = function (e) {
  const buttonType = getButtonType(e);
  let count = 0;
  let decimalIndex;
  for (let i = 0; i < display.textContent.length; i++) {
    if (Number.isInteger(+display.textContent[i])) {
      count++;
    }
    if (display.textContent[i] === ".") {
      decimalIndex = i;
    }
    if (count === 9) {
      if (buttonType === "number" || buttonType === "decimal") {
        display.textContent = display.textContent.slice(0, i + 1);
        return;
      }
      if (decimalIndex && Math.abs(+display.textContent) <= 999999999) {
        const decimalShift = 10 ** (i - decimalIndex);
        display.textContent =
          Math.round(+display.textContent * decimalShift) / decimalShift;
        return;
      }
      if (Math.abs(+display.textContent) > 999999999) {
        const scientific = Number(display.textContent)
          .toExponential()
          .toString()
          .replace("+", "");
        const allowedDecimals =
          7 - scientific.slice(scientific.indexOf("e") + 1).length;
        let count = 0;
        for (let i = 0; i < scientific.indexOf("e"); i++) {
          if (Number.isInteger(+scientific[i])) {
            count++;
          }
          if (count === allowedDecimals) {
            const decimalShift = 10 ** allowedDecimals;
            display.textContent = `${
              Math.round(
                Number(scientific.slice(0, scientific.indexOf("e"))) *
                  decimalShift
              ) / decimalShift
            }${scientific.slice(scientific.indexOf("e"))}`;
            return;
          }
        }

        display.textContent = scientific;
      }
    }
  }
  if (+display.textContent > 999999999) {
    display.textContent = Number(display.textContent)
      .toExponential()
      .toString()
      .replace("+", "");
  }
};

const updateUI = function (e) {
  const buttonType = getButtonType(e);
  display.textContent = createDisplayValue(e, buttonType);
  // trimDisplayValue(buttonType);
  if (buttonType === "number") {
    removeOperatorHighlights();
  }

  if (buttonType === "operator") {
    removeOperatorHighlights();

    if (e.target === addBtn) {
      addBtn.classList.add("selected");
    }

    if (e.target === subtractBtn) {
      subtractBtn.classList.add("selected");
    }

    if (e.target === multiplyBtn) {
      multiplyBtn.classList.add("selected");
    }

    if (e.target === divideBtn) {
      divideBtn.classList.add("selected");
    }
  }

  if (buttonType === "clear") {
    removeOperatorHighlights();
  }
};

const updateState = function (e) {
  const buttonType = getButtonType(e);
  if (buttonType === "number") {
    if (state.lastKeyPressed === "equals") {
      state.stored = "";
      state.operator = "";
      state.tempStored = "";
    }
  }

  if (buttonType === "decimal") {
    if (state.lastKeyPressed === "equals") {
      state.stored = "";
    }
  }

  if (buttonType === "operator") {
    if (state.lastKeyPressed !== "equals") {
      state.stored = +display.textContent;
      // state.stored = +state.displayValue;
    }

    if (e.target === addBtn) {
      state.operator = add;
    }

    if (e.target === subtractBtn) {
      state.operator = subtract;
    }
    if (e.target === multiplyBtn) {
      state.operator = multiply;
    }
    if (e.target === divideBtn) {
      state.operator = divide;
    }
  }

  if (buttonType === "equals") {
    if (state.stored === "") return;

    if (state.lastKeyPressed !== "equals") {
      state.tempStored = +display.textContent;
      // state.tempStored = state.displayValue;
      state.lastKeyPressed = buttonType;
      return;
    }

    state.stored = +display.textContent;
    // state.stored = state.displayValue;
  }

  if (buttonType === "clear") {
    state.stored = "";
    state.tempStored = "";
    state.operator = "";
  }

  if (buttonType === "delete") {
    if (state.lastKeyPressed === "equals") {
      state.stored = "";
    }
  }

  if (buttonType === "percent") {
    if (state.lastKeyPressed === "equals") {
      state.stored = +display.textContent;
      // state.stored = +state.displayValue;
      return;
    }
  }

  if (buttonType === "sign") {
    if (state.lastKeyPressed === "equals") {
      state.stored = +display.textContent;
      // state.stored = +state.displayValue;
      return;
    }
  }

  state.lastKeyPressed = buttonType;
};

// Event listeners
allBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    updateUI(e);
    updateState(e);
    trimDisplayValue(e);
  })
);
operatorBtns.forEach((btn) =>
  btn.addEventListener("mousedown", function () {
    this.classList.add("mousedown");
  })
);
