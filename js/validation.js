/*
Project:  Project 5 – Visitor Form Validation
Name: Christopher Ocariza
Submitted: April 29, 2025

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file, and possibly immediate failure of the class.

Reflection:
This project strengthened my understanding of JavaScript form validation 
through regex and logical checks. I discovered how to structure JS into modular 
files and utilize Flexbox for form layout. Initially, styling responsively 
posed some challenges, but it became much neater once I grasped Flexbox.
*/

const stateAbbreviations = ["UT", "CA", "NY", "TX", "NV", "WA", "FL"]; // Add more as needed
const zipRegex = /^\d{5}(-\d{4})?$/;
const phoneRegex = /^(\+?1\s?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initValidation(formSelector) {
  const form = document.querySelector(formSelector);
  const inputs = form.querySelectorAll("input[type=text], input[type=checkbox]");

  inputs.forEach(input => {
    input.addEventListener("change", () => {
      validateField(input.id);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const valid = validateForm();
    if (valid) {
      form.style.display = "none";
      document.getElementById("success").style.display = "block";
    } else {
      form.classList.add("was-validated");
    }
  });
}

function validateForm() {
  let isValid = true;
  isValid &= checkRequired("first-name", "First name is required");
  isValid &= checkRequired("last-name", "Last name is required");
  isValid &= checkRequired("address", "Address is required");
  isValid &= checkRequired("city", "City is required");
  isValid &= checkRequired("state", "State is required") && validateState("state", "Invalid state abbreviation");
  isValid &= checkFormat("zip", "Invalid zip code", zipRegex);
  isValid &= checkFormat("phone", "Invalid phone number", phoneRegex);
  isValid &= checkFormat("email", "Invalid email", emailRegex);
  isValid &= checkRequired("find-page", "At least one option must be selected", true);

  return !!isValid;
}

function validateField(id) {
  switch (id) {
    case "state": validateState(id, "Invalid state abbreviation"); break;
    case "zip": checkFormat(id, "Invalid zip code", zipRegex); break;
    case "email": checkFormat(id, "Invalid email", emailRegex); break;
    case "phone": checkFormat(id, "Invalid phone", phoneRegex); break;
    default: checkRequired(id, "Required field");
  }
}

function checkRequired(id, message, isCheckboxGroup = false) {
  let valid;
  if (isCheckboxGroup) {
    const checkboxes = document.querySelectorAll("input[name='find-page']");
    valid = Array.from(checkboxes).some(box => box.checked);
  } else {
    const input = document.getElementById(id);
    valid = input.value.trim() !== "";
  }
  setElementValidity(id, valid, message);
  return valid;
}

function checkFormat(id, message, regex) {
  const input = document.getElementById(id);
  const valid = regex.test(input.value);
  setElementValidity(id, valid, message);
  return valid;
}

function validateState(id, message) {
  const input = document.getElementById(id);
  const valid = stateAbbreviations.includes(input.value.toUpperCase());
  setElementValidity(id, valid, message);
  return valid;
}

function setElementValidity(id, valid, message) {
  const input = document.getElementById(id);
  const msgDiv = input?.nextElementSibling;
  if (input) {
    input.classList.add("was-validated");
    input.setCustomValidity(valid ? "" : message);
  }
  if (msgDiv) {
    msgDiv.textContent = valid ? "" : message;
    msgDiv.style.display = valid ? "none" : "block";
  }
}