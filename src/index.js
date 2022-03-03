// DOM Elements
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const divFormData = document.querySelectorAll(".formData");
// btn de fermeture de la modale
const closeBtn = document.querySelector(".close");
// la balise du formulaire
const formulaire = document.querySelector("form");
// btn de validation de formulaire
const submitFormBtn = document.querySelector(".btn-submit");
// liste des inputs utilisant le même type d'event
const inputs = {
  prenom: document.querySelector("#first"),
  nom: document.querySelector("#last"),
  email: document.querySelector("#email"),
  naissance: document.querySelector("#birthdate"),
  nbGame: document.querySelector("#quantity"),
  cgu: document.querySelector("#checkbox1"),
};
// liste des inputs de type radio
const allRadios = document.querySelectorAll('input[name="location"]');

// gestions des validations
const formValidations = [];
// span pour affiché le msg d'erreur
const sendError = document.createElement("span");
// affectation d'une classe
sendError.classList.add("errorMsg");
// et un style par defaut
sendError.style.color = "red";
// je place l'attribut required dans la checkbox
inputs.cgu.setAttribute("required", "");
// je place l'attribut required dans la checkbox
inputs.cgu.setAttribute("checked", "");

// on boucle sur les differents ids
for (const key in inputs) {
  inputs[key].addEventListener("input", (evt) => {
    // on va regarder mon id
    // selon son appellation, on le dirige vers la bonne fonction.
    switch (evt.target.id) {
      case "first":
        checkName(evt);
        break;
      case "last":
        checkName(evt);
        break;
      case "email":
        checkEmail(evt);
        break;
      case "birthdate":
        checkBirthDate(evt);
        break;
      case "quantity":
        checkNbGame(evt);
        break;
      case "checkbox1":
        checkCGU(evt);
        break;
    }
  });
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.addEventListener("click", closeModal);
// écoute du formulaire
formulaire.addEventListener("submit", (evt) => {
  // arreter le comportement par defaut du formulaire
  evt.preventDefault();
  // je nettoie les valeurs du formulaires (si il y a eu des erreurs)
  clearErrorValue("error");
  checkFormValidation();
});
allRadios.forEach((radio) =>
  radio.addEventListener("input", (evt) => checkRadio(evt)),
);

// launch modal form
function launchModal() {
  clearErrorValue("all");
  modalbg.style.display = "block";
}

// Les Fonctions
// fonction qui gere le btn de la barre de navigation
function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function clearErrorValue(value) {
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
    [A-Z]             = Valeurs alphabétique
    [0-9;:<>,?!*+/.]  = Valeur numérique et caractères spéciaux
    {2,25}            = Doit contenir entre 2 et 25 caractères
    gi                = Global(la valeur complète) et case insensitive 
    */
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    clearErrorValue("error");
    if (!/[0-9;:<>,?!*+/.]/.test(inputValue.target.value)) {
      // si la condition est bonne, je supprime le msg d'erreur
      clearErrorValue("error");
      // je place dans le tableau la valeur de ce qui est valide
      formValidations.push(inputValue.target.name);
    } else {
      const error = (sendError.textContent =
        "Pas de valeurs numérique ni de caractères spéciaux");
      if (inputValue.target.id === "first") {
        return divFormData[0].appendChild(error);
      } else if (inputValue.target.id === "last") {
        return divFormData[1].appendChild(error);
      }
    }
  } else {
    // condition pour le placement du message d'erreur
    if (inputValue.target.id === "first") {
      return divFormData[0].appendChild(sendError);
    } else {
      return divFormData[1].appendChild(sendError);
    }
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  sendError.textContent = "Veuillez enter une adresse email valide";
  /**
   * [A-Z0-9._-] = Accept les valeurs alphanumerique ainsi que le . _ -
   * +@          = Concatenation avec l'@
   * [A-Z0-9-]   = Des valeurs alphanumérique
   * +.          = On concatene avec l'.
   * [A-Z]{2,4}  = Valeurs alphabétique, entre 2 et 4 caractères
   * gi          = Globale et insensible à la casse
   */
  if (/[A-Z0-9._-]+@[A-Z0-9-]+.[A-Z]{2,4}/gi.test(inputValue.target.value)) {
    clearErrorValue("error");
    formValidations.push("email");
  } else {
    return divFormData[2].appendChild(sendError);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkBirthDate(inputValue) {
  /**
   * ^ = commence par ...
   * (19|20)\d\d  = Doit commancé par 19 ou 20 et se fini par 2 chiffres
   * [-/.]        = Doit avoir en separation ces caractères : - / .
   * [0-9]        = Doit contenir que des nombres entre 0 et 9
   */
  if (/^(19|20)\d\d+[-/.]+[0-9]+[-/.][0-9]/.test(inputValue.target.value)) {
    clearErrorValue("error");
    formValidations.push("date");
  } else {
    sendError.textContent = "Vous devez entrer votre date de naissance.";
    return divFormData[3].appendChild(sendError);
  }
}

function checkNbGame(evt) {
  // Je converti la valeur de type string à Number
  const goodValue = Number(evt.target.value);
  // si elle est bien converti, la valeur sera true
  if (typeof goodValue === "number") {
    formValidations.push("nbChallenge");
  } else {
    sendError.textContent = "Vous devez choisir une valeur numérique.";
    return divFormData[4].appendChild(sendError);
  }
}

/**
 * @param {boolean} evt = par défault la valeur est false
 * @returns  {string} en cas d'erreur
 */
function checkRadio(evt = false) {
  if (!evt) {
    sendError.textContent = "Vous devez choisir une option.";
    return divFormData[5].appendChild(sendError);
  } else if (evt.target.checked) {
    formValidations.push(evt.target.checked);
  }
}

function checkCGU(evt = true) {
  // Cible le 1er label près de l'id cgu
  const labelCgu = document.querySelector("#cgu").nextSibling;
  // si la valeur est présente
  if (evt.target.checked) {
    // j'hote l'attribut
    submitFormBtn.removeAttribute("disabled");
    // et replace la bonne couleur au btn
    submitFormBtn.style.backgroundColor = "#fe142f";
    clearErrorValue("error");
    formValidations.push("cgu");
  } else {
    // Si l'on ne valide pas les CGUs le bouton n'est plus fonctionnel
    submitFormBtn.setAttribute("disabled", "");
    // et change de couleur.
    submitFormBtn.style.backgroundColor = "darkred";
    // je vérifie si la valeur est présente dan le tableau
    const isCgu = formValidations.includes("cgu");
    if (isCgu) {
      // sil elle est présente, je la supprime.
      formValidations.pop("cgu");
    }
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
  const isCgu = formValidations.includes("cgu");
  // si elles ne sont pas présentes, je relance la fonction
  if (!ville) {
    checkRadio();
  }
  if (!isCgu) {
    checkCGU();
  }
  if (isCgu && ville) {
    // je supprime le formulaire s'il remplit les conditions
    formulaire.innerHTML = "";
    // je vide le tabeau des validation et efface les MSGs d'erreur
    clearErrorValue("all");
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
