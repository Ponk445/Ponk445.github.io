const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByTagName('input'));

const calculate = () => {
  const input = display.value;
  const result = eval(input);
  display.value = result;
};

const clearDisplay = () => {
  display.value = '';
};

const handleNumberClick = (event) => {
  const input = event.target.value;
  display.value += input;
};

const handleOperatorClick = (event) => {
  const input = event.target.value;
  display.value += input;
};

const handleClearClick = () => {
  clearDisplay();
};

const handleEqualsClick = () => {
  calculate();
};

buttons.forEach((button) => {
  if (button.type === 'button') {
    button.addEventListener('click', (event) => {
      if (button.value === 'C') {
        handleClearClick();
      } else if (button.value === '=') {
        handleEqualsClick();
      } else if (button.value === '+' || button.value === '-' || button.value === '*' || button.value === '/') {
        handleOperatorClick(event);
      } else {
        handleNumberClick(event);
      }
    });
  }
});