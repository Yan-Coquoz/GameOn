function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

/**
 * TODO refactoré
 */
/**
 * TODO pour chaque messages d'erreurs des fonction de check, envoyer un numero dans une fonction "wrongMsg" correspondant au numero de divFormData.
 */
/*
TODO placé un timer sur le message d'erreur (environ 5sec)
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);
// écoute du formulaire
formulaire.addEventListener("submit", (evt) => {
  // arreter le comportement par defaut du bouton type submit
  evt.preventDefault();
  // je nettoie les valeurs du formulaires (si il y a eu des erreurs)
  clearForm();
  myForm(evt);
});
prenom.addEventListener("input", (evt) => {
  checkName(evt);
});
nom.addEventListener("input", (evt) => {
  checkName(evt);
});
email.addEventListener("input", (evt) => {
  checkEmail(evt);
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
  checkBirthDate(naissance.value);
  checkRadio();
  checkCheckbox();
  nbChallenge();
  checkFormValidation();
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns true | {string} en cas d'erreur
 */
function checkName(inputValue) {
  sendError.textContent =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  /* 
    [A-Z]= tout ce qui est alphabétique
    {2,25}= doit contenir entre 2 et 25 caractères
    gi = global et case insensitive 
    */
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    clearForm();
    return true;
  } else {
    if (inputValue.target.id === "first") {
      return divFormData[0].append(sendError);
    } else {
      return divFormData[1].append(sendError);
    }
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns true | {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  sendError.textContent = "Veuillez enter une adresse email valide";
  if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}/gi.test(inputValue.target.value)) {
    clearForm();
    return true;
  } else {
    return divFormData[2].append(sendError);
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
  }
}
function validationMessage() {
  // creation d'element du DOM :
  // balise <p>
  const message = document.createElement("p");
  // balise <button>
  const btn = document.createElement("button");
  // creation / placement du texte de confirmation
  message.innerHTML = "Merci !<br> Votre réservation a été reçue.";
  message.style.textAlign = "center";
  // ajout d'une classe
  message.classList.add("message");
  // ajout du texte du bouton et d'une classe
  btn.textContent = "Fermer";
  btn.classList.add("button");
  // style de la modale
  modalContent.style.display = "flex";
  modalContent.style.flexDirection = "column";
  modalContent.style.justifyContent = "space-between";
  modalContent.style.alignItems = "center";
  modalContent.style.height = "80vh";
  // ajout de style sur le bouton
  btn.style.marginBottom = "1rem";
  btn.style.padding = "1rem 4rem";
  // placement des elements
  modalContent.appendChild(message);
  modalContent.appendChild(btn);
  // écoute du bouton
  btn.addEventListener("click", closeModal);
}
