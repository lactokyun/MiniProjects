const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmailValidation(email);
    checkPasswordMath(password, password2);
})

function checkRequired(inputs) {
    inputs.forEach((input) => {
        if(input.value.trim() === '') {
            showError(input, `${input.id} is required`)
        } else {
            showSuccess(input);
        }
    }) 
}

function checkLength(input, min, max) {
    const inputLength = input.value.length;

    if((inputLength !== 0 && inputLength < min) || inputLength > max) {
        showError(input, `length of ${input.id} must be between ${min} and ${max}`);
    }
}

function checkEmailValidation(input) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkPasswordMath(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}