function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const divFormData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const formulaire = document.querySelector("form");
const submitBtn = document.querySelector(".btn-submit");
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");
const sendError = document.createElement("span");
sendError.classList.add("errorMsg");
sendError.style.color = "red";

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);

// écoute du formulaire
formulaire.addEventListener("submit", (evt) => {
  evt.preventDefault();
  myForm();
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
/* reccupere les données du formulaire */
function myForm() {
  const validPrenom = checkLength(prenom.value);
  const validNom = checkLength(nom.value);
  const validEmail = checkEmail(email.value);

  if (validPrenom !== true) {
    sendError.textContent = validPrenom;
    divFormData[0].append(sendError);
  }
  if (validNom !== true) {
    sendError.textContent = validNom;
    divFormData[1].append(sendError);
  }
  if (validEmail !== true) {
    sendError.textContent = validEmail;
    divFormData[2].append(sendError);
  }
}

function checkLength(inputValue) {
  const wronglength =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  if (inputValue.length >= 2) {
    return true;
  } else {
    return wronglength;
  }
}
function checkEmail(inputValue) {
  const wrongContent = "Veuillez enter une adresse email valide";
  if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/.test(inputValue)) {
    return true;
  } else {
    return wrongContent;
  }
}
