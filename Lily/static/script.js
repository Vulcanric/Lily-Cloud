
function sleep(milliseconds) {
    /* SYCHRONOUSLY SLEEP FOR A DURATION OF <MILLISECONDS>
    (method) Atomics.wait(typedArray: Int32Array, index: number, value: number,
    timeout?: number): "ok" | "not-equal" | "timed-out" (+1 overload)
    If the value at the given position in the array is equal to the provided value,
    the current agent is put to sleep causing execution to suspend until the timeout
    expires (returning "timed-out") or until the agent is awoken (returning "ok");
    otherwise, returns "not-equal".
    */
    int32 = new int32Array(4) // Create a typed array (can be any size above 1)
    Atomics.wait(int32, 0, 0, milliseconds)
}


// Get login page using button
function getLoginPage() {
    document.location = "/sessions";
}


// Validate and submit form
function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const age = document.getElementById('age');

    if (!email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)) {
        alertCustom("Please enter a valid email address");
    }
    else if (age && parseInt(age.value) < 2) {
        alertCustom("You must be 2 years and above to register");
    }
    else {
        form.submit();
    }
}


// Popup Alert
// function alertCustom(message) {
//     let formAlert = document.getElementById('formalert');
//     formAlert.hidden = false;
//     formAlert.innerText = message;
//     setTimeout(() => formAlert.hidden = true, 5000);
// }
// function showPopover(event) {
//     popup = document.getElementById('popup')
//     if (popup && document.readyState == "complete") {
//         popup.showPopover();
//         setTimeout(() => popup.hidePopover(), 2000);
//     }
// }
// document.addEventListener('readystatechange', showPopover)


// End user's session
function endSession(event) {
    console.log("I passed here");
    fetch(
        "/sessions",
        {
            method: "DELETE",
            redirect: "follow"
        }
    )
    .then((response) => {
        if (response.redirected) {
            console.log(response.status, response.url, response.headers, response.body);
            window.location.href = response.url;
        }
        return;
    })
    .catch(err => {
        console.log(err);
    });
}
const logout = document.querySelectorAll(".logout");
logout.forEach((elem) => {
    elem.addEventListener('click', endSession);
});


// Dynamize side bar/navigation
const expandSideBarIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
const collapseSideBarIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>';
// Change toggle-side-bar button title
function toggleTitle() {
    if (toggleSideBarButton.classList.contains('title_showbar')) {
        toggleSideBarButton.title = "Show side bar";
    }
    else if (toggleSideBarButton.classList.contains('title_hidebar')) {
        toggleSideBarButton.title = "Hide side bar";
    }
    toggleSideBarButton.
}
// Toggle side bar / navigation
function toggleSideBar(){
    const sideBarItems = document.querySelectorAll(".hideable");
    sideBarItems.forEach((item) => {
        if (item.hidden === true) { // Show side bar
            item.hidden = false;
            item.classList.add(['flex-direction__column']);
            toggleSideBarButton.innerHTML = collapseSideBarIcon;
            toggleSideBarButton.classList.replace('title-showbar', 'title-hidebar');
        } else {
            item.hidden = true; // Hide side bar
            item.classList.remove(['flex-direction__column']);
            toggleSideBarButton.innerHTML = expandSideBarIcon;
            toggleSideBarButton.classList.replace('title-hidebar', 'title-showbar');
        }
    });
};
const toggleSideBarButton = document.getElementById("toggle_side_nav_items");
if (toggleSideBarButton) {
    toggleSideBarButton.addEventListener('mouseover', toggleTitle);
    toggleSideBarButton.addEventListener('click', toggleSideBar);
}


// Toggle password visibility
const visibilityOnIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>';
const visibilityOffIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>';
function togglePasswordVisibility() {
    const passwordInputField = document.getElementById("password");
    if (passwordInputField.type === 'password') {
        console.log(passwordInputField.type);
        passwordInputField.type = 'text';
        togglePasswordVisibilityButton.innerHTML = visibilityOnIcon;
    } else {
        passwordInputField.type = 'password';
        togglePasswordVisibilityButton.innerHTML = visibilityOffIcon;
    }
}
const togglePasswordVisibilityButton = document.getElementById("eye_icon_for_passwd_visibility");
if (togglePasswordVisibilityButton) {
    togglePasswordVisibilityButton.addEventListener('click', togglePasswordVisibility);
}

const all = document.querySelector('body');
