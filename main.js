const form = document.getElementById('nsc-form');
const systemTypeFrom = document.getElementById('systemTypeFrom');
const systemTypeTo = document.getElementById('systemTypeTo');
const input = document.getElementById('numberInput');
const output = document.getElementById('output');
const decimal = 'decimal';
const binary = 'binary';

form.addEventListener('submit', handleNumberSystemsConvert);

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

function splitReverse(input) {
  if (typeof number != 'string') input += '';

  let decimalDigits = [];
  while (input != '') {
    // get last char at the number 'as a string' then convert to number, and add it to the array
    let currentNumber = input.at(-1);
    decimalDigits.push(currentNumber);
    input = input.slice(0, -1);
  }
  return decimalDigits;
}
