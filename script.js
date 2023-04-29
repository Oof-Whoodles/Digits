let numbers = new Array(5);
let answer = '';
const key = ['topleft','topmiddle','topright','bottomleft','bottommiddle','bottomright']
const operators = ['addition','subtraction','division','multiplication'];
const fontCorrection = {
  5:'24px',
  6:'20px',
  7:'18px',
  8:'16px',
  9:'14px'
}
//maybe make it so the outline changes colors for each time it has been combined kinda like 2048

function setUp() {
  const max = 31; //max is exclusive
  const min = 1;
  let maxIndex = 5;
  for (let i = 0; i < 6; i++) {
    numbers[i] = Math.floor(Math.random() * (max - min) + min);
  }
  const numberOfOperations = Math.floor(Math.random() * (7 - 4) + 4); //4-6 steps
  let numbersCopy = JSON.parse(JSON.stringify(numbers));
  for (let i = 0; i < numberOfOperations; i++) {
    let operation = operators[Math.floor(Math.random() * (4 - 0) + 0)];
    let index = Math.floor(Math.random() * (maxIndex+1 - 0) + 0)
    console.log(operation,numbersCopy[index],i);

    if (i == 0) {
      answer = numbersCopy[index];
      console.log(answer, 'answer');
      numbersCopy.splice(index, 1);
      maxIndex--;
      continue;
    }

    else if (operation == 'addition') {
      answer = answer + numbersCopy[index];
    }
    else if (operation == 'multiplication') {
      answer = answer * numbersCopy[index];
    }
    else if (operation == 'subtraction') {
      if (answer - numbersCopy[index] <= 0) {
        i--;
        console.log('invalid subtraction');
        continue;
      }
      answer = answer - numbersCopy[index];
    }
    else if (operation == 'division') {
      if (Number.isInteger(answer / numbersCopy[index]) == false) {
        i--;
        console.log('invalid division');
        continue;
      }
      answer = answer / numbersCopy[index];
    }
    numbersCopy.splice(index, 1);
    maxIndex--;
    console.log(answer, 'answer');
  }
  document.getElementById('answer').innerHTML = answer;
}
setUp();
let numbersCopy = JSON.parse(JSON.stringify(numbers));

function reset() {
  numbers = JSON.parse(JSON.stringify(numbersCopy));
  selectedIndex = '';
  selectedOperation = '';
  for (let i = 0; i < 6; i++) {
  document.getElementById(key[i]).innerHTML = numbers[i];
  document.getElementById(key[i]).style.visibility = 'visible';
  document.getElementById(key[i]).style.outlineColor = 'black';
  document.getElementById(key[i]).style.backgroundColor = 'lightpink';
}
  for (let i = 0; i < 4; i++) {
  document.getElementById(operators[i]).style.outlineColor = 'black';
}
}



for (let i = 0; i < 6; i++) {
  document.getElementById(key[i]).innerHTML = numbers[i];
}
let selectedIndex = '';
let selectedOperation = '';

function select(id) {
  if (selectedIndex && selectedOperation && document.getElementById(key[selectedIndex]) != document.getElementById(key[id])) {
    evaluateNumbers(id);
    return '';
  }
  else if (selectedIndex && document.getElementById(key[selectedIndex]) != document.getElementById(key[id])) {
    document.getElementById(key[selectedIndex]).style.backgroundColor = 'lightpink';
    selectedIndex = '';
  }
  selectedIndex = id;
  element = document.getElementById(key[id])
  element.style.backgroundColor == 'lightskyblue' ? element.style.backgroundColor = 'lightpink' : element.style.backgroundColor = 'lightskyblue';
}

function selectOperation(id) {
  for (let i of operators) {
    document.getElementById(i).style.outlineColor = 'black';
  }
  if (id != selectedOperation) {
    selectedOperation = id;
    document.getElementById(id).style.outlineColor = 'blue';
  }
  else {
    selectedOperation = '';
  }
  
}

function evaluateNumbers(id) {
  let output = -1;
  if (selectedOperation === 'addition') {
    output = numbers[selectedIndex] + numbers[id];
  }
  else if (selectedOperation === 'subtraction') {
    if (numbers[selectedIndex] - numbers[id] > 0) {
      output = numbers[selectedIndex] - numbers[id];
    }
    else {
      selectedOperation = '';
      return 'invalid subtraction';
    }
  }
  else if (selectedOperation === 'multiplication') {
    output = numbers[selectedIndex] * numbers[id];
  }
  else if (selectedOperation === 'division') {
    if (Number.isInteger(numbers[selectedIndex] / numbers[id])) {
      output = numbers[selectedIndex] / numbers[id];
    }
    else {
      selectedOperation = '';
      return 'invalid division';
    }
  }
  if (output.toString().length >= 5) {
    let newPosition = parseInt(window.getComputedStyle(document.getElementById(key[id])).top)+(32-parseInt(fontCorrection[output.toString().length]));
    document.getElementById(key[id]).style.fontSize = fontCorrection[output.toString().length];
    document.getElementById(key[id]).style.top = `${newPosition}px`;
  }
  document.getElementById(key[selectedIndex]).style.visibility = 'hidden';
  document.getElementById(key[id]).innerHTML = output;
  document.getElementById(key[id]).style.outlineColor = 'lightskyblue';
  document.getElementById(selectedOperation).style.outlineColor = 'black';
  numbers[selectedIndex] = 0;
  numbers[id] = output;
  console.log(output);
  if (output == answer) {
    console.log('complete');
    for (let element of document.getElementsByClassName('complete')) {
      element.style.visibility = 'visible';
    }
  }
  
  selectedIndex = '';
  selectedOperation = ''; 
  
}