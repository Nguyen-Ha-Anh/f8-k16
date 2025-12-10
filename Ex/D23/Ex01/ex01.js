const form = document.querySelector('.login-form');
import ClassList from '../../../../../F8-offline-learn/Final Exam/BKStar/src/classroom/ClassList';

const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');

function clearState(input) {
    const parent = input.parentEl;
    parent.querySelector('.error-msg').classList.add('hidden');
    parent.querySelector('.icon-error').classList.add('hidden');
    parent.querySelector('.icon-success').classList.add('hidden');

    input.classList.remove('border-red-500', 'border-green-500');
    input.classList.add('border-[#ddd]');
}