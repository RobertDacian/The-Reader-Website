import { message } from "../components/message.js";
import { navToggle } from "../components/nav.js";

const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");

const contactEmail = document.querySelector("#contactEmail");
const emailError = document.querySelector("#emailError");

const contactSubject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const contactMessage = document.querySelector("#contactMessage");
const msgError = document.querySelector("#msgError");

const button = document.querySelector("#contactButton");

const form = document.querySelector("#contactForm");

const success = document.querySelector(".msg-container");

button.addEventListener("click", checkForm);

function checkForm(event) {
  // event.preventDefault();

  if (!fullName.validity.valid) {
    fullNameError.style.visibility = "visible";
    // fullNameError.innerText = fullName.validationMessage;
    fullNameError.innerHTML = message("error", "Please type your full name, minimum 5 characters");
    fullName.style.border = "1px solid red";
  } else {
    fullNameError.style.visibility = "hidden";
    fullName.style.border = "1px solid green";
  }

  if (!contactEmail.validity.valid) {
    emailError.style.visibility = "visible";
    // emailError.innerText = contactEmail.validationMessage;
    emailError.innerHTML = message("error", "Please type in a valid email address ");
    contactEmail.style.border = "1px solid red";
  } else {
    emailError.style.visibility = "hidden";
    contactEmail.style.border = "1px solid green";
  }

  if (!contactSubject.validity.valid) {
    subjectError.style.visibility = "visible";
    // emailError.innerText = contactSelect.validationMessage;
    subjectError.innerHTML = message("error", "Please type a subject, minimum 15 characters long ");
    contactSubject.style.border = "1px solid red";
  } else {
    subjectError.style.visibility = "hidden";
    contactSubject.style.border = "1px solid green";
  }

  if (!contactMessage.validity.valid) {
    msgError.style.visibility = "visible";
    msgError.innerHTML = message("error", "Please type your message, minimum 25 characters long ");
    // msgError.innerText = contactMessage.validationMessage;
    contactMessage.style.border = "1px solid red";
  } else {
    msgError.style.visibility = "hidden";
    contactMessage.style.border = "1px solid green";
  }

  if (
    fullName.validity.valid &&
    contactEmail.validity.valid &&
    contactSubject.validity.valid &&
    contactMessage.validity.valid
  ) {
    console.log("submitted");
    let isError = false;

    if (isError === false) {
      form.style.visibility = "hidden";
      success.style.visibility = "visible";
      success.innerHTML = message("success", "Thank you, the form was successfully submitted.");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.forms[0].addEventListener("submit", function (e) {
    e.preventDefault();
    e.currentTarget.classList.add("submitted");
  });
});
