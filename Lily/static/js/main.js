import (
    logUserOut, toggleSideBar
) from "./utils"

/* const buttonIcons = {
    arrow_up: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>',
    arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>',
    eye_open: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>',
    eye_close: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaklEQVR4nO3UQUvUYRAG8N+mEuLBQwoRfgLRW1uCiEWhXkRBxBDU8O6xgwc9qYin+ghdugRdugaKCF7UII+ighSl+Am8rLwwyfJnd91dF0Loub0z884z7zszD/9xH/EUq9jFL1zhNw7wHi+Rqzd5Ht9whBX04wla8Dj8i0G2j+Fakqeq3kXV82iuIn48ivkQRdyKufiarloqQzu+YKma4CZ3Q86/RAumG5xzEo+KDQ9xjFcNIujBH3RmHUM4ybLXgdYY6bflAtawhbY7fPtnfKw0AMmxjZ1YuFpH+Gvcr7grqfln2MBPzOJBFQRj0dNPOMeLcoGjoUndcX4WVaVNXsZANDKRduB5KMMPfMfruDdYjqgvHEmPijGFPayHClyggMuwJ4HcxELm3l+iJK436C1BkCo+xEjGXsic04tPS2hcPka5IiZiFHO3kIjX1LXMe9EnVZCMhOTXjJkys14oYcs1WpbeNDLZ/cI1MQ1BkFm/DmUAAAAASUVORK5CYII=" alt="closed-eye">'
} */

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
