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

function showError(field, message) {
    const errorElement = document.getElementById(`${field}-error`);
    const inputElement = document.getElementById(field);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputFields = document.querySelectorAll(`.input-box input`);

    errorMessages.forEach((message) => {
        message.textContent = '';
        message.style.display = 'none';
    });

    inputFields.forEach((field) => {
        field.classList.remove('error');
    });
}

// function showLoginForm() {
//     const formContainer = document.querySelector('.form-container');
//     formContainer.classList.remove('active');
// }


document.querySelector('.formbox.login form').addEventListener('submit', async (e) => {
    e.preventDefault();
    resetErrors();

    const email = document.getElementById('email').value.trim();
    localStorage.setItem('email', email);
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });

        const result = await response.json();
        if (response.ok) {
            const username = result.username;
            window.location.href = `/success.html?username=${encodeURIComponent(username)}`;
        } else {
            showError('general', result.message)
        }
    } catch (error) {
        showError('general', error);
        console.log("Error:", error);
        // alert("An error occurred");
    }
});

document.querySelector('.formbox.register form').addEventListener('submit', async (e) => {
    e.preventDefault();
    resetErrors();

    const form = document.querySelector('.formbox.register form');
    const username = form.querySelector("#username").value.trim()
    const email = form.querySelector("#email").value.trim();
    const password = form.querySelector("#password").value;
    const repeatPassword = form.querySelector("#repeat-password").value;

    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters.');
        return;
    }
    if (password !== repeatPassword) {
        e.preventDefault();
        showError("password", "Passwords do not match.");
        showError("repeat-password", "Passwords do not match.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password}),
        });

        const result = await response.json();
        console.log(response);
        console.log(result);
        // console.log
        // alert(result.message);
        if (response.status === 201) {
            // window.location.href('/login.html')
            // showLoginForm();
            document.querySelector('.form-container').classList.remove('active');
        } else {
            showError('general-register', 'Error occurred. You may already have an account with this email.');
            return;
        }
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred");
    }
});

