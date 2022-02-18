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
const naissance = document.querySelector("#birthdate");
const sendError = document.createElement("span");
sendError.classList.add("errorMsg");
sendError.style.color = "red";
const formValidation = [];

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
  checkBirth(naissance.value);

  if (typeof validPrenom === "string") {
    sendError.textContent = validPrenom;
    divFormData[0].append(sendError);
  } else {
    formValidation.push(validPrenom);
  }
  if (typeof validNom === "string") {
    sendError.textContent = validNom;
    divFormData[1].append(sendError);
  } else {
    formValidation.push(validNom);
  }
  if (typeof validEmail === "string") {
    sendError.textContent = validEmail;
    divFormData[2].append(sendError);
  } else {
    formValidation.push(validEmail);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns true | {string} en cas d'erreur
 */
function checkLength(inputValue) {
  let wronglength =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  if (inputValue.length >= 2) {
    if (/[?:0-9]/.test(inputValue)) {
      wronglength = "Le nom ne doit pas contenir de nombre";
      return wronglength;
    } else {
      return true;
    }
  } else {
    return wronglength;
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns true | {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  const wrongContent = "Veuillez enter une adresse email valide";
  if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(inputValue)) {
    return true;
  } else {
    return wrongContent;
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkBirth(inputValue) {
  if (inputValue.length === 0) {
    sendError.textContent = "Vous devez entrer votre date de naissance.";
    return divFormData[3].append(sendError);
  } else {
    const validNaissance = true;
    formValidation.push(validNaissance);
  }
}
