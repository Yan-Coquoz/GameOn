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
const cgu = document.querySelector("#checkbox1");
const nbGame = document.querySelector("#quantity");

const formValidations = [];
const sendError = document.createElement("span");
sendError.classList.add("errorMsg");
sendError.style.color = "red";

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
  checkFormValidation();
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
nbGame.addEventListener("input", (evt) => {
  checkNbGame(evt);
});
allRadios.forEach((radio) =>
  radio.addEventListener("input", (evt) => checkRadio(evt)),
);
cgu.addEventListener("click", checkCGU);

// launch modal form
function launchModal() {
  clearForm("all");
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function clearForm(value) {
  switch (value) {
    case "form":
      // supprime toutes les valeurs du tableaux
      formValidations.length = 0;
      break;
    case "error":
      // nettoye les messages d'erreur
      sendError.textContent = "";
      break;
    case "all":
      formValidations.length = 0;
      sendError.textContent = "";
      break;
  }
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
    [A-Z] = tout ce qui est alphabétique
    [0-9] = tout ce qui est numérique
    {2,25}= doit contenir entre 2 et 25 caractères
    gi = global(la valeur complète) et case insensitive 
    */
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    clearForm("error");
    if (!/[0-9]/.test(inputValue.target.value)) {
      // si la condition est bonne, je supprime l'erreur
      clearForm("error");
      // je place dans le tableau la valeur de ce qui est valide
      formValidations.push(inputValue.target.name);
    } else {
      if (inputValue.target.id === "first") {
        const error = (sendError.textContent = " Pas de valeurs numérique");
        return divFormData[0].appendChild(error);
      } else if (inputValue.target.id === "last") {
        const error = (sendError.textContent = " Et pas de valeurs numérique");
        return divFormData[1].appendChild(error);
      }
    }
  } else {
    // condition pour le placement du message d'erreur
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
    formValidations.push("email");
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
    formValidations.push("date");
  } else {
    sendError.textContent = "Vous devez entrer votre date de naissance.";
    return divFormData[3].append(sendError);
  }
}

function checkNbGame(evt) {
  const goodValue = Number(evt.target.value);
  console.log(typeof goodValue);
  if (typeof goodValue === "number") {
    formValidations.push("nbChallenge");
  } else {
    sendError.textContent = "Vous devez choisir une valeur numérique.";
    return divFormData[4].append(sendError);
  }
}

/**
 * @param {boolean} evt = par défault la valeur est false
 * @returns  {string} en cas d'erreur
 */
function checkRadio(evt = false) {
  if (!evt) {
    sendError.textContent = "Vous devez choisir une option.";
    return divFormData[5].append(sendError);
  } else if (evt.target.checked) {
    formValidations.push(evt.target.checked);
  }
}

function checkCGU() {
  const labelCgu = document.querySelector("#cgu").nextSibling;

  if (cgu.checked) {
    clearForm("error");
    formValidations.push("cgu");
  } else {
    formValidations.pop("cgu");
    sendError.style.display = "inline-blocK";
    sendError.textContent =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    return labelCgu.after(sendError);
  }
}

function checkFormValidation() {
  // for (let index = 0; index < formValidations.length; index++) {
  //   console.log(
  //     `${formValidations[index]} => ${typeof formValidations[index]}`,
  //   );
  // }

  // je check si les valeurs sont présente dans tableau des validations
  const ville = formValidations.includes(true);
  const cgu = formValidations.includes("cgu");
  // si elles ne sont pas présentes,
  if (!ville) {
    checkRadio();
  }
  if (!cgu) {
    checkCGU();
  }
  if (cgu && ville) {
    // je supprime le formulaire s'il remplit les conditions
    formulaire.innerHTML = "";
    // je vide le tabeau des validation et efface les MSGs d'erreur
    clearForm("all");
    // MSG de validation de formulaire
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
