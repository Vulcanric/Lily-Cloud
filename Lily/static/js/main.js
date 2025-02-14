import {
    submitForm, logUserOut,
    togglePasswordVisibility
} from "./utils.js";

const form = document.getElementById("form");
if (form) {
    form.addEventListener('submit', submitForm)
}

const loginButton = document.getElementById("login_button");
if (loginButton) {
    loginButton.addEventListener('click', () => document.href.location = '/login');
}

const logout = document.querySelectorAll(".logout");
logout.forEach((elem) => {
    elem.addEventListener('click', logUserOut);
});

const toggleSideBarButton = document.getElementById("toggle_side_nav_items");
if (toggleSideBarButton) {
}

const passwordIcon = document.getElementById("password_eye");
if (passwordIcon) {
    passwordIcon.addEventListener('click', togglePasswordVisibility);
}
