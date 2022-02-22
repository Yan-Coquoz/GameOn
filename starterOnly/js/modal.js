function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

/**
 * TODO pour chaque messages d'erreurs des fonction de check, envoyer un numero dans une fonction "wrongMsg" correspondant au numero de divFormData.
 */
/*
TODO placé un timer sur le message d'erreur (environ 5sec)
*/

/**
 * TODO refactoré
 */

/**
 * TODO responsive
 */

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const divFormData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const formulaire = document.querySelector("form");
const submitBtn = document.querySelector(".btn-submit");
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");
const naissance = document.querySelector("#birthdate");
const nbgames = document.querySelector("#quantity");
const sendError = document.createElement("span");
sendError.classList.add("errorMsg");
sendError.style.color = "red";
const formValidation = [];

function validationMessage() {
  const message = document.createElement("p");
  message.innerHTML = "Merci !<br> Votre réservation a été reçue.";
  message.style.textAlign = "center";
  message.classList.add("message");
  const btn = document.createElement("button");
  btn.textContent = "Fermer";
  btn.classList.add("button");
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "space-between";
  modalContent.style.alignItems = "center";
  modalContent.style.height = "80vh";
  modalContent.appendChild(message);
  modalContent.appendChild(btn);
  btn.style.marginBottom = "1rem";
  btn.style.padding = "1rem 4rem";
  btn.addEventListener("click", closeModal);
  clearForm();
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);
// écoute du formulaire
formulaire.addEventListener("submit", (evt) => {
  evt.preventDefault();
  clearForm();
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

function clearForm() {
  // supprime toutes les valeurs du tableaux
  formValidation.length = 0;
  // nettoye les messages d'erreur
  sendError.textContent = "";
}

/* reccupere les données du formulaire */
function myForm() {
  const validPrenom = checkLength(prenom.value);
  const validNom = checkLength(nom.value);
  const validEmail = checkEmail(email.value);
  checkBirthDate(naissance.value);
  checkRadio();
  checkCheckbox();
  nbChallenge();
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
  checkFormValidation();
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
function checkBirthDate(inputValue) {
  if (inputValue.length === 0) {
    sendError.textContent = "Vous devez entrer votre date de naissance.";
    return divFormData[3].append(sendError);
  } else {
    formValidation.push(true);
  }
}
/**
 * @returns true | {string} en cas d'erreur
 */
function checkRadio() {
  const allRadios = document.querySelectorAll('input[name="location"]');
  const disables = [];
  for (const key in allRadios) {
    const element = allRadios[key].checked;
    if (element) {
      formValidation.push(true);
    } else {
      disables.push(element);
    }
  }
  if (disables.length === 12) {
    sendError.textContent = "Vous devez choisir une option.";
    return divFormData[5].append(sendError);
  }
}
function nbChallenge() {
  const goodValue = Number(nbgames.value);

  if (typeof goodValue === "number") {
    formValidation.push(true);
  } else {
    sendError.textContent = "Vous devez choisir une valeur numérique.";
    return divFormData[4].append(sendError);
  }
}

function checkCheckbox() {
  if (document.querySelector("#checkbox1").checked) {
    formValidation.push(true);
  } else {
    sendError.textContent =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    return divFormData[6].append(sendError);
  }
}
function checkFormValidation() {
  if (formValidation.length === 7) {
    // je supprime le formulaire s'il remplit les conditions
    formulaire.innerHTML = "";
    // voir removeChild()
    validationMessage();
  } else {
    console.log("on recommence");
  }
}
