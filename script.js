"use strict";
/*
  Black & White Calculator (MIT)
  - Pure HTML/CSS/JS, no external dependencies
  - Displays an image from the query parameter ?url=...
  - Keyboard support: digits, + - * /, ., Enter/=/Backspace/Escape/%
*/

// Calculator state
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

// Update the calculator display element
function updateDisplay() {
  const display = document.querySelector(".calculator-display");
  if (display) display.textContent = calculator.displayValue;
}

// Input handling
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  }
}

function toggleSign() {
  if (calculator.displayValue === "0") return;
  calculator.displayValue = calculator.displayValue.startsWith("-")
    ? calculator.displayValue.slice(1)
    : "-" + calculator.displayValue;
}

function percent() {
  const value = parseFloat(calculator.displayValue);
  if (Number.isNaN(value)) return;
  calculator.displayValue = String(value / 100);
  // Percent acts on the current entry; don't force op unless chaining
}

function backspace() {
  if (calculator.waitingForSecondOperand) return; // nothing to delete yet
  const v = calculator.displayValue;
  if (v.length <= 1 || (v.length === 2 && v.startsWith("-"))) {
    calculator.displayValue = "0";
  } else {
    calculator.displayValue = v.slice(0, -1);
  }
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// Map of operations
const performCalculation = {
  "/": (first, second) => (second === 0 ? NaN : first / second),
  "*": (first, second) => first * second,
  "+": (first, second) => first + second,
  "-": (first, second) => first - second,
  "=": (first, second) => second
};

function round10(value) {
  // Reduce floating point artifacts (e.g., 0.1 + 0.2)
  return parseFloat(Number(value).toFixed(10));
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(calculator.displayValue);

  if (calculator.operator && calculator.waitingForSecondOperand) {
    // Replace operator if user changes it before entering second operand
    calculator.operator = nextOperator;
    return;
  }

  if (calculator.firstOperand == null && !Number.isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (calculator.operator) {
    const result = performCalculation[calculator.operator](calculator.firstOperand, inputValue);
    const safeResult = Number.isNaN(result) || !Number.isFinite(result) ? "Error" : String(round10(result));

    calculator.displayValue = safeResult;
    calculator.firstOperand = safeResult === "Error" ? null : parseFloat(safeResult);
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

// Keyboard support
function handleKeydown(e) {
  const key = e.key;

  if (/^\d$/.test(key)) {
    inputDigit(key);
    updateDisplay();
    return;
  }
  if (key === ".") {
    inputDecimal();
    updateDisplay();
    return;
  }
  if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
    updateDisplay();
    return;
  }
  if (key === "Enter" || key === "=") {
    handleOperator("=");
    updateDisplay();
    e.preventDefault();
    return;
  }
  if (key === "Backspace") {
    backspace();
    updateDisplay();
    return;
  }
  if (key === "Escape") {
    resetCalculator();
    updateDisplay();
    return;
  }
  if (key === "%") {
    percent();
    updateDisplay();
    return;
  }
}

// Image loader from ?url=...
function initImageFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const url = params.get("url");
  const container = document.getElementById("image-section");
  const img = document.getElementById("external-image");
  const hint = document.getElementById("image-hint");

  if (!container || !img || !hint) return;

  if (url) {
    let source = url;
    try { source = decodeURIComponent(url); } catch (_) { /* ignore */ }
    img.src = source;
    hint.textContent = "Loading image...";

    img.addEventListener("load", () => {
      hint.textContent = "";
    });
    img.addEventListener("error", () => {
      hint.textContent = "Could not load image from the provided URL.";
    });
  }
}

// DOM ready
window.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

  const keys = document.querySelector(".calculator-keys");
  if (keys) {
    keys.addEventListener("click", (evt) => {
      const btn = evt.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const value = btn.value;

      switch (action) {
        case "digit":
          inputDigit(value);
          break;
        case "decimal":
          inputDecimal();
          break;
        case "operator":
          handleOperator(value);
          break;
        case "clear":
          resetCalculator();
          break;
        case "delete":
          backspace();
          break;
        case "sign":
          toggleSign();
          break;
        case "percent":
          percent();
          break;
        default:
          break;
      }

      updateDisplay();
    });
  }

  document.addEventListener("keydown", handleKeydown);

  initImageFromQuery();
});
