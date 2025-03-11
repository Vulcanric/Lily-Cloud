const buttonIcons = {
    arrow_up: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>',
    arrow_down: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>',
    eye_open: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2c2307"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>',
    eye_close: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaklEQVR4nO3UQUvUYRAG8N+mEuLBQwoRfgLRW1uCiEWhXkRBxBDU8O6xgwc9qYin+ghdugRdugaKCF7UII+ighSl+Am8rLwwyfJnd91dF0Loub0z884z7zszD/9xH/EUq9jFL1zhNw7wHi+Rqzd5Ht9whBX04wla8Dj8i0G2j+Fakqeq3kXV82iuIn48ivkQRdyKufiarloqQzu+YKma4CZ3Q86/RAumG5xzEo+KDQ9xjFcNIujBH3RmHUM4ybLXgdYY6bflAtawhbY7fPtnfKw0AMmxjZ1YuFpH+Gvcr7grqfln2MBPzOJBFQRj0dNPOMeLcoGjoUndcX4WVaVNXsZANDKRduB5KMMPfMfruDdYjqgvHEmPijGFPayHClyggMuwJ4HcxELm3l+iJK436C1BkCo+xEjGXsic04tPS2hcPka5IiZiFHO3kIjX1LXMe9EnVZCMhOTXjJkys14oYcs1WpbeNDLZ/cI1MQ1BkFm/DmUAAAAASUVORK5CYII=" alt="closed-eye">'
}


export function submitForm(event) {
  event.preventDefault();

  try {
      validateUserInput();
      validateUser();
  } catch (error) {
      alertCustom(error.message); // Inform user on the error
  }
}

function validateUserInput() {
  const userEmail = document.getElementById("email");
  const userAge = document.getElementById("age");
  const FORMAT = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
  const MIN_AGE = 5;

  if (userAge && (userAge < MIN_AGE)) {
      throw new Error("You must be at least five (5) years to register");
  }

  if (!userEmail.value.match(FORMAT)) {
      throw new Error("Please enter a valid email address");
  }
}

function validateUser() {
  const form = document.getElementById("form");
  const purpose = form.getAttribute("purpose");

  let endpoint = `/${purpose}`;

  const userData = new FormData(form);
  let queryStr = "";

  userData.forEach((value, key) => {
      queryStr += `${key}=${value}&`;
  });
  queryStr = encodeURI(queryStr.slice(0, -1)); // Remove trailing &, and encode it

  fetch(
      endpoint,
      {
          method: "POST",
          body: queryStr,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          }
      },
  )
    .then(res => res.json())
    .then(valid => {
      const delay = showPopover(valid.reason) + 1000; // Wait <delay> time plus 1 seconds

      setTimeout(() => {
          if (valid.status === 1) {
              window.location.href = "/";
          }
      }, delay);
    })
}

export function togglePasswordVisibility() {
    const passwordInputField = document.getElementById("password");
    const passwordIcon = document.getElementById("password_eye")
    if (passwordInputField.type === 'password') {
        passwordInputField.type = 'text';
        passwordIcon.innerHTML = buttonIcons["eye_open"];
    } else {
        passwordInputField.type = 'password';
        passwordIcon.innerHTML = buttonIcons["eye_close"];
    }
}


export function logUserOut(event) {
    console.log("I passed here");
    fetch(
        "/logout",
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


function showPopover(message) {
    const popup = document.getElementById('popup')
    const info = document.getElementById('popup_message');

    popup.showPopover();
    info.innerText = message;
    setTimeout(() => popup.hidePopover(), 5000);

    return 5000;
}


function alertCustom(message) {
    let formAlert = document.getElementById('form_alert');
    formAlert.hidden = false;
    formAlert.innerText = message;
    setTimeout(() => formAlert.hidden = true, 5000);
}
