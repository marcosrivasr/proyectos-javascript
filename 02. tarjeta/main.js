const inputCard = document.querySelector("#inputCard");
const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");

const maskNumber = "####-####-####-####";
const maskDate = "##/##";
const maskCVS = "###";
let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

inputCard.addEventListener("keydown", (e) => {
  e.preventDefault();
  handleInput(maskNumber, e.key, cardNumber);
  inputCard.value = cardNumber.join("");
});

inputDate.addEventListener("keydown", (e) => {
  e.preventDefault();
  handleInput(maskDate, e.key, dateNumber);
  inputDate.value = dateNumber.join("");
});

inputCVV.addEventListener("keydown", (e) => {
  e.preventDefault();
  handleInput(cvvNumber, e.key, cvvNumber);
  inputCVV.value = cvvNumber.join("");
});

function handleInput(mask, key, arr) {
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (numbers.includes(key) && arr.length + 1 <= mask.length) {
    if (mask[arr.length] === "-" || mask[arr.length] === "/") {
      //current += mask[current.length] + key;
      arr.push(mask[arr.length], key);
    } else {
      //current += key;
      arr.push(key);
    }

    //inputCard.value = current;
  }
}
