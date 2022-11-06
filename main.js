const form = document.getElementById('nsc-form');
const systemTypeFrom = document.getElementById('systemTypeFrom');
let systemFrom = systemTypeFrom.options[systemTypeFrom.selectedIndex].value;
const systemTypeTo = document.getElementById('systemTypeTo');
let systemTo = systemTypeTo.options[systemTypeTo.selectedIndex].value;
const input = document.getElementById('numberInput');
const inputWrap = document.getElementById('input-wrap');
const output = document.getElementById('output');
// Data
const DECIMAL = 'decimal';
const BINARY = 'binary';
const HEX = 'hex';
const binaryNumbers = [0, 1];
const decimalNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hexNumber = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  ,
  'A',
  'a',
  'B',
  'b',
  'C',
  'c',
  'D',
  'd',
  'E',
  'e',
  'F',
  'f',
];
const numbersMap = new Map([
  [10, ['A', 'a']],
  [11, ['B', 'b']],
  [12, ['C', 'c']],
  [13, ['D', 'd']],
  [14, ['E', 'e']],
  [15, ['F', 'f']],
]);

// Event Listeners
systemTypeFrom.addEventListener('input', () => {
  systemFrom = systemTypeFrom.options[systemTypeFrom.selectedIndex].value;
  validateUserInput();
});

systemTypeTo.addEventListener('input', () => {
  systemTo = systemTypeTo.options[systemTypeTo.selectedIndex].value;
  validateUserInput();
});

input.addEventListener('input', () => {
  validateUserInput();
});

form.addEventListener('submit', handleNumberSystemsConvert);

/**
 * Validate user input according to current system to change from
 */
function validateUserInput() {
  const splittedInput = splitReverse(input.value);

  if (
    systemFrom == BINARY &&
    !splittedInput.every((item) => binaryNumbers.includes(item))
  )
    notifyUser({
      isValidInput: false,
      message: 'Binary numbers are only 0s and 1s',
    });
  else if (
    systemFrom == DECIMAL &&
    !splittedInput.every((item) => decimalNumber.includes(item))
  )
    notifyUser({
      isValidInput: false,
      message: 'Decimal numbers are only within 0:9',
    });
  else if (
    systemFrom == HEX &&
    !splittedInput.every((item) => hexNumber.includes(item))
  )
    notifyUser({
      isValidInput: false,
      message: 'Hex Decimal numbers are within 0:9 and a:f',
    });
  else
    notifyUser({
      isValidInput: true,
      message: '',
    });
}

/**
 *
 * @param {{isValidInput, message}} Object notify user
 */
function notifyUser({ isValidInput, message }) {
  if (!isValidInput) {
    window.navigator.vibrate([100, 70, 100]);
    input.style.animation = 'shake 0.3s';
    setTimeout(() => {
      input.style.animation = '';
    }, 500);
  }
  inputWrap.setAttribute('data-is-error', !isValidInput);
  inputWrap.setAttribute('data-error-messege', message);
}

function handleNumberSystemsConvert(e) {
  e.preventDefault();
  const fromUnit = systemTypeFrom.options[systemTypeFrom.selectedIndex].value;
  const toUnit = systemTypeTo.options[systemTypeTo.selectedIndex].value;
  const userInput = input.value;

  if (userInput.length == 1 && Number(userInput) == 1) {
    updateResult(1);
    return;
  }

  if (userInput.length == 1 && Number(userInput) == 0) {
    updateResult(0);
    return;
  }

  //   const numberDigits = userInput.split('').reverse();
  const numberDigits = splitReverse(userInput);
  console.log(numberDigits);

  // if (fromUnit == decimal && toUnit == binary)
  //   output.innerText = fromDecimalToBinary(userInput);
  // else if (fromUnit == binary && toUnit == decimal)
  //   output.innerText = fromBinaryToDecimal(userInput);
  // else if (fromUnit == binary && toUnit == binary) output.innerText = userInput;
  // else if (fromUnit == decimal && toUnit == decimal)
  //   output.innerText = userInput;
}

/**
 *
 * @param {Any} result, to update output
 */
function updateResult(result) {
  output.innerText = result;
}

function fromBinaryToDecimal(input) {
  const regExp = /[a-z]/i;
  if (regExp.test(input)) return 'Enter a valid Binary';

  if (input == 0) return 0;
  if (input == 1) return 1;

  // get input digits seperated
  let decimalDigits = [];
  let inputClone = input;
  while (inputClone > 0) {
    // get last char at the number 'as a string' then convert to number, and add it to the array
    let currentNumber = Number(inputClone.at(-1));
    if (!(currentNumber == 1 || currentNumber == 0))
      return 'Enter a valid Binary';
    decimalDigits.push(currentNumber);
    inputClone = inputClone.slice(0, -1);
  }

  return getSumAs(decimalDigits, 2);
}

function fromDecimalToBinary(input) {
  return input + 'fromBinaryToDecimal';
}

// ************************************ //
// ************ Utilities ************ //
// ********************************** //

/**
 * This is similar to Array.split(), but I wanted to implement the logic
 * @param {string} input
 * @returns {Array} array of splitted input
 */
function splitReverse(input) {
  if (typeof number != 'string') input += '';

  let decimalDigits = [];
  while (input != '') {
    // get last char at the number 'as a string' then convert to number, and add it to the array
    let currentNumber = input.at(-1);
    let newItem = currentNumber.match('[0-9]')
      ? Number(currentNumber)
      : currentNumber;
    decimalDigits.push(newItem);
    input = input.slice(0, -1);
  }
  return decimalDigits;
}

/**
 *
 * @param {Array} arrayOfNumbers array of digits to convert from
 * @param {Number} numberSystem to convert to (2: binary, 10: decimal, 16: hex)
 */
function getSumAs(arrayOfNumbers, numberSystem) {
  let result = 0;

  for (let i = 0; i < arrayOfNumbers.length; i++)
    result += numberSystem ** i * arrayOfNumbers[i];

  return result;
}
