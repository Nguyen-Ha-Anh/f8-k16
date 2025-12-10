const form = document.querySelector('.js-form');

const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#password');
const confirmPassInput = document.querySelector('#password_confirm');

// Ẩn toàn bộ thông báo khi người dùng click để sửa
function clearState(input) {
    const parent = input.parentElement;
    parent.querySelector('.js-error').classList.add('hidden');
    parent.querySelector('.js-icon-error').classList.add('hidden');
    parent.querySelector('.js-icon-success').classList.add('hidden');

    input.classList.remove('border-red-500', 'border-green-500');
    input.classList.add('border-[#ddd]');
}

function showError(input) {
    const parent = input.parentElement;

    const errorMsg = parent.querySelector('.js-error');
    const errorIcon = parent.querySelector('.js-icon-error');
    const successIcon = parent.querySelector('.js-icon-success');

    input.classList.add('border-red-500');
    input.classList.remove('border-[#ddd]');

    errorMsg.classList.remove('hidden');
    errorIcon.classList.remove('hidden');
    successIcon.classList.add('hidden');
}

function showSuccess(input) {
    const parent = input.parentElement;

    const errorMsg = parent.querySelector('.js-error');
    const errorIcon = parent.querySelector('.js-icon-error');
    const successIcon = parent.querySelector('.js-icon-success');

    input.classList.add('border-green-500');
    input.classList.remove('border-red-500');

    errorMsg.classList.add('hidden');
    errorIcon.classList.add('hidden');
    successIcon.classList.remove('hidden');
}

// Validate
function isValidUsername(value) {
    return value.trim() !== '';
}
function isValidEmail(value) {
    return value.includes('@') && value.includes('.');
}
function isValidPassword(value) {
    return value.length >= 6;
}
function isPasswordConfirm(pass, confirmPass) {
    return pass === confirmPass;
}

// MAIN VALIDATE
function validateForm() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const pass = passInput.value;
    const confirmPass = confirmPassInput.value;

    if (!isValidUsername(username)) {
        showError(usernameInput);
    } else {
        showSuccess(usernameInput);
    }

    if (!isValidEmail(email)) {
        showError(emailInput);
    } else {
        showSuccess(emailInput);
    }

    if (!isValidPassword(pass)) {
        showError(passInput);
    } else {
        showSuccess(passInput);
    }

    if (!isPasswordConfirm(pass, confirmPass)) {
        showError(confirmPassInput);
    } else {
        showSuccess(confirmPassInput);
    }
}

// Submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
});

// Khi focus vào input → ẩn toàn bộ trạng thái
[usernameInput, emailInput, passInput, confirmPassInput].forEach(input => {
    input.addEventListener('input', () => clearState(input));
    input.addEventListener('focus', () => clearState(input));
});
