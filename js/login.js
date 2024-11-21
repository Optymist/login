const formContainer = document.querySelector('.form-container');
const logLink = document.querySelector('.log-link');
const regLink = document.querySelector('.reg-link');
const navBtn = document.querySelector('.navbar-btn');
const closeIcon = document.querySelector('.close-icon')

regLink.addEventListener('click', ()=> {
    formContainer.classList.add('active');
});

logLink.addEventListener('click', ()=> {
    formContainer.classList.remove('active');
});

navBtn.addEventListener('click', ()=> {
    formContainer.classList.add('active-popup');
});

closeIcon.addEventListener('click', ()=> {
    formContainer.classList.remove('active-popup');
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.formbox.login form');
    const registerForm = document.querySelector('.formbox.register form');
    const loginPasswordField = loginForm.querySelector("#password");
    const toggleLoginPassword = loginForm.querySelector("#toggle-password-login");
    const registerPasswordField = registerForm.querySelector("#password");
    const registerRepeatPasswordField = registerForm.querySelector("#repeat-password");
    const toggleRegisterPassword = registerForm.querySelector("#toggle-password");
    const toggleRegisterRepeatPassword = registerForm.querySelector("#toggle-repeat-password");

    const toggleVisibility = (field, icon) => {
        if (field.type === 'password') {
            field.type = 'text';
            icon.setAttribute('name', 'eye');
        } else {
            field.type = 'password';
            icon.setAttribute('name', 'eye-off');
        }
    };

    toggleLoginPassword.addEventListener('click', () => toggleVisibility(loginPasswordField, toggleLoginPassword));
    toggleRegisterPassword.addEventListener('click', () => toggleVisibility(registerPasswordField, toggleRegisterPassword));
    toggleRegisterRepeatPassword.addEventListener('click', () => toggleVisibility(registerRepeatPasswordField, toggleRegisterRepeatPassword));
});

document.querySelector('.formbox.login form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred");
    }
});

document.querySelector('.formbox.register form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.querySelector('.formbox.register form');
    const username = form.querySelector("#username").value.trim()
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value;
    const repeatPassword = form.querySelector("#repeat-password").value;

    console.log(password);
    console.log(repeatPassword);

    if (password !== repeatPassword) {
        e.preventDefault();
        alert("Passwords do not match. Please check again.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password}),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred");
    }
});