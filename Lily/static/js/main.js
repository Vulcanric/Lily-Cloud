import { logUserOut, toggleSideBar } from "./utils";

const loginButton = document.getElementById("login_button")
if (loginButton) {
    loginButton.addEventListener('click', () => document.href.location = '/login');
}

const logout = document.querySelectorAll(".logout");
logout.forEach((elem) => {
    elem.addEventListener('click', logUserOut);
});

const toggleSideBarButton = document.getElementById("toggle_side_nav_items");
if (toggleSideBarButton) {
    toggleSideBarButton.addEventListener('click', toggleSideBar);
}
