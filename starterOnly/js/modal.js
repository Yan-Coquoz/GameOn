function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

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
const allRadios = document.querySelectorAll('input[name="location"]');
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
  clearForm("error");
  myForm();
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
naissance.addEventListener("input", (evt) => {
  checkBirthDate(evt);
});
allRadios.forEach((radio) =>
  radio.addEventListener("input", (evt) => checkRadio(evt)),
);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function clearForm(value) {
  switch (value) {
    case "all":
      // supprime toutes les valeurs du tableaux
      formValidation.length = 0;
      // nettoye les messages d'erreur
      sendError.textContent = "";
      break;
    case "form":
      formValidation.length = 0;
      break;
    case "error":
      sendError.textContent = "";
      break;
  }
}

function myForm() {
  checkFormValidation();
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns {string} en cas d'erreur
 */
function checkName(inputValue) {
  // console.log(inputValue.target.name);
  sendError.textContent =
    "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  /* 
    [A-Z]= tout ce qui est alphabétique
    {2,25}= doit contenir entre 2 et 25 caractères
    gi = global et case insensitive 
    */
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    clearForm("error");
    formValidation.push(inputValue.target.name);
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
 * @returns {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  sendError.textContent = "Veuillez enter une adresse email valide";

  if (/[A-Z0-9._-]+@[A-Z0-9-]+.[A-Z]{2,4}/gi.test(inputValue.target.value)) {
    clearForm("error");
    formValidation.push("email");
  } else {
    return divFormData[2].append(sendError);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkBirthDate(inputValue) {
  /**
   * ^ = commence par ...
   * (19|20)\d\d = Doit commancé par 19 ou 20 et se fini par 2 chiffres
   * [-/.] = doit avoir en separation ces caractères : - / .
   * [0-9] = doit contenir que des nombres entre 0 et 9
   */
  if (/^(19|20)\d\d+[-/.]+[0-9]+[-/.][0-9]/.test(inputValue.target.value)) {
    clearForm("error");
    formValidation.push("date");
  } else {
    sendError.textContent = "Vous devez entrer votre date de naissance.";
    return divFormData[3].append(sendError);
  }
}

/**
 * @param {boolean} evt = par défault la valeur est false
 * @returns  {string} en cas d'erreur
 */
function checkRadio(evt = false) {
  console.log(evt.target.checked);
  if (evt.target.checked) {
    console.log(evt.target.value);
    formValidation.push(evt.target.checked);
  } else {
    console.log(evt);
    sendError.textContent = "Vous devez choisir une option.";
    return divFormData[5].append(sendError);
  }
}

function nbChallenge() {
  const goodValue = Number(nbgames.value);
  if (typeof goodValue === "number") {
    formValidation.push("nbChallenge");
  } else {
    sendError.textContent = "Vous devez choisir une valeur numérique.";
    return divFormData[4].append(sendError);
  }
}

function checkCGU() {
  if (document.querySelector("#checkbox1").checked) {
    formValidation.push("cgu");
  } else {
    sendError.textContent =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    return divFormData[6].append(sendError);
  }
}

function checkFormValidation() {
  for (let index = 0; index < formValidation.length; index++) {
    console.log(`${formValidation[index]} => ${typeof formValidation[index]}`);
  }

  const ville = formValidation.includes(true);
  const cgu = formValidation.includes("cgu");

  if (!ville) {
    sendError.textContent = "Vous devez choisir une option.";
    return divFormData[5].append(sendError);
  }
  if (!cgu) {
    checkCGU();
  }
  if (cgu && ville) {
    // je supprime le formulaire s'il remplit les conditions
    formulaire.innerHTML = "";
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
