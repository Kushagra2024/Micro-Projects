/******************************************* VARIABLE AND CONSTANS ******************************************/
const passDisplay = document.querySelector('#pass_display');
const copyBtn = document.querySelector('#copy_btn');
const passLength = document.querySelector('#pass_length');
const passLengthValue = document.querySelector('#pass_length__value');
const lowercase = document.querySelector('#lowercase');
const uppercase = document.querySelector('#uppercase');
const digit = document.querySelector('#digit');
const specialchar = document.querySelector('#special_chars');
const generatePassBtn = document.querySelector('#generate_btn');
const closeAlertBtn = document.querySelector('#close_alert_btn');
const alertBox = document.querySelector('#alert_box');

let passLen = undefined;
let isLowercaseAllowed = undefined;
let isUppercaseAllowed = undefined;
let isDigitAllowed = undefined;
let isSpeccharAllowed = undefined;

/************************************************* FUNCTIONS ************************************************/
function inputControllers() {

    passLen = passLength.value;

    isLowercaseAllowed = lowercase.checked;

    isUppercaseAllowed = uppercase.checked;

    isDigitAllowed = digit.checked;

    isSpeccharAllowed = specialchar.checked;
};

function generateRandomChar(string) {

    const length = string.length;

    const randomNum = Math.floor(Math.random() * length);

    return string.charAt(randomNum);
}

function generatePassword() {

    const lowerCaseString = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitString = '0123456789';
    const specialCharecterString = '!@#$%^&*<>?|":';

    let charString = '';
    let passString = '';

    charString += isLowercaseAllowed ? lowerCaseString : '';
    charString += isUppercaseAllowed ? upperCaseString : '';
    charString += isDigitAllowed ? digitString : '';
    charString += isSpeccharAllowed ? specialCharecterString : '';

    for (let i = 0; i < passLen; i++) {
        passString += generateRandomChar(charString);
    }

    passDisplay.value = passString;

    if(passString.length !== 0) {
        copyBtn.removeAttribute('disabled');
    }
    else {
        copyBtn.setAttribute('disabled', 'true');
        alertBox.classList.remove('hidden');
        alertBox.classList.add('flex');
    }
}

function copyPassToClipboard() {
    passDisplay.select();

    navigator.clipboard.writeText(passDisplay.value);
}


/********************************************** EVENT LISTENERS *********************************************/
passLength.addEventListener('change', inputControllers);
lowercase.addEventListener('change', inputControllers);
uppercase.addEventListener('change', inputControllers);
digit.addEventListener('change', inputControllers);
specialchar.addEventListener('change', inputControllers);
passLength.addEventListener('change', (e) => passLengthValue.innerText = e.target.value);
generatePassBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassToClipboard);
closeAlertBtn.addEventListener('click',() => {
    alertBox.classList.remove('flex');
    alertBox.classList.add('hidden');
})

/******************************************** ONLOAD FUNCTION CALL *******************************************/
inputControllers();