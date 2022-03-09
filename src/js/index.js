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
// span pour affiché le msg d'erreur
const sendError = document.querySelectorAll(".error-msg");
// gestions des validations
const formValidations = [];

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

  checkFormValidation();
});
allRadios.forEach((radio) =>
  radio.addEventListener("input", (evt) => checkRadio(evt)),
);

// launch modal form
function launchModal() {
  // clearErrorValue("all");
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// fonction qui gere le btn de la barre de navigation
function editNav() {
  var topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 */
function checkName(inputValue) {
  if (inputValue.target.id === "first") {
    typeName(0, inputValue);
  } else if (inputValue.target.id === "last") {
    typeName(1, inputValue);
  }
}
/**
 *
 * @param {number} index - index du parent de l'input
 * @param {string} inputValue - valeur de l'input
 * @returns un msg d'erreur
 */
function typeName(index, inputValue) {
  /* 
    [A-Z]             = Valeurs alphabétique
    [0-9;:<>,?!*+/.]  = Valeur numérique et caractères spéciaux
    {2,25}            = Doit contenir entre 2 et 25 caractères
    gi                = Global(la valeur complète) et case insensitive 
    */
  if (/[A-Z]{2,25}/gi.test(inputValue.target.value)) {
    // place une classe sur le parent (css => :focus-within)
    inputValue.target.parentNode.classList.remove("input-error");
    // je supprime les classes si les conditions sont bonnes
    divFormData[index].classList.remove("contain-error");
    sendError[index].classList.remove("visible");
    // et valide l'input
    formValidations.push(inputValue.target.id);
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    divFormData[index].classList.add("contain-error");
    sendError[index].classList.add("visible");
    sendError[index].textContent =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    // placement du message d'erreur
    return divFormData[index].appendChild(sendError[index]);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns {string} en cas d'erreur
 */
function checkEmail(inputValue) {
  sendError[2].textContent = "Veuillez enter une adresse email valide";
  /**
   * [A-Z0-9._-] = Accept les valeurs alphanumerique ainsi que le . _ -
   * +@          = Concatenation avec l'@
   * [A-Z0-9-]   = Des valeurs alphanumérique
   * +.          = On concatene avec l'.
   * [A-Z]{2,4}  = Valeurs alphabétique, entre 2 et 4 caractères
   * gi          = Globale et insensible à la casse
   */
  if (/[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gi.test(inputValue.target.value)) {
    inputValue.target.parentNode.classList.remove("input-error");
    divFormData[2].classList.remove("contain-error");
    sendError[2].classList.remove("visible");
    formValidations.push("email");
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    divFormData[2].classList.add("contain-error");
    sendError[2].classList.add("visible");
    return divFormData[2].appendChild(sendError[2]);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkBirthDate(inputValue) {
  sendError[3].textContent = "Vous devez entrer votre date de naissance.";
  /**
   * ^ = commence par ...
   * (19|20)\d\d  = Doit commencer par 19 ou 20 et se fini par 2 chiffres
   * [-/.]        = Doit avoir en separation ces caractères : - / .
   * [0-9]        = Doit contenir que des nombres entre 0 et 9
   */
  if (/^(19|20)\d\d+[-/.]+[0-9]+[-/.][0-9]/.test(inputValue.target.value)) {
    inputValue.target.parentNode.classList.remove("input-error");
    divFormData[3].classList.remove("contain-error");
    sendError[3].classList.remove("visible");
    formValidations.push(inputValue.target.id);
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    divFormData[3].classList.add("contain-error");
    sendError[3].classList.add("visible");
    return divFormData[3].appendChild(sendError[3]);
  }
}
/**
 * @param {string} evt - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkNbGame(evt = false) {
  sendError[4].textContent = "Vous devez choisir une valeur numérique.";
  // si evt est differant de false (donc arrive de l'ecouteur)
  if (evt !== false) {
    // je test que la valeur soit bien numerique entre 1 et 2 chiffre
    if (/^[0-9]{1,2}/.test(evt.target.value)) {
      // je supprime les classes d'erreur
      evt.target.parentNode.classList.remove("input-error");
      sendError[4].classList.remove("visible");
      divFormData[4].classList.remove("contain-error");
      // et je push une validation
      formValidations.push("nbChallenge");
    } else {
      divFormData[4].classList.add("contain-error");
      evt.target.parentNode.classList.add("input-error");
      sendError[4].classList.add("visible");
      return divFormData[4].appendChild(sendError[4]);
    }
  } else if (!isNaN(evt) || evt === false) {
    divFormData[4].classList.add("contain-error");
    inputs.nbGame.parentNode.classList.add("input-error");
    sendError[4].classList.add("visible");
    return divFormData[4].appendChild(sendError[4]);
  }
}
/**
 * @param {boolean} evt - par défault la valeur est false
 * @returns  {string} en cas d'erreur
 */
function checkRadio(evt = false) {
  sendError[5].textContent = "Vous devez choisir une option.";
  if (evt === false) {
    divFormData[5].classList.add("input-error");
    divFormData[5].classList.add("contain-error");
    sendError[5].classList.add("visible");
    return divFormData[5].appendChild(sendError[5]);
  } else if (evt.target.checked) {
    divFormData[5].classList.remove("contain-error");
    divFormData[5].classList.remove("input-error");
    sendError[5].classList.remove("visible");
    formValidations.push(evt.target.checked);
  }
}
/**
 * @param {boolean} evt - par défault la valeur est true
 * @returns  {string} en cas d'erreur
 */
function checkCGU(evt = true) {
  sendError[6].textContent =
    "Vous devez vérifier que vous acceptez les termes et conditions.";

  // si la valeur est présente
  if (inputs.cgu.checked || evt.target.checked) {
    sendError[6].classList.remove("visible");
    // j'hote l'attribut qui permet de ne pas cliqué sur le btn
    submitFormBtn.removeAttribute("disabled");
    // et replace la bonne couleur au btn
    submitFormBtn.style.backgroundColor = "#fe142f";
    // suppression des classes pour les erreurs
    divFormData[6].classList.remove("input-error");
    divFormData[6].classList.remove("contain-error");

    formValidations.push("cgu");
  } else if (!evt || evt.target.checked === false) {
    // Si l'on ne valide pas les CGUs le bouton n'est plus fonctionnel
    submitFormBtn.setAttribute("disabled", "");
    // et change de couleur.
    submitFormBtn.style.backgroundColor = "darkred";

    //je supprime la valeur des cgu du tableau pour ne pas valider le formulaire.
    formValidations.pop("cgu");

    divFormData[6].classList.add("input-error");
    divFormData[6].classList.add("contain-error");
    sendError[6].classList.add("visible");
    return divFormData[6].appendChild(sendError[6]);
  }
}
/**
 * je regarde si chaque valeurs est présente pour la validation du formulaire avant la validation
 */
function checkFormValidation() {
  // je check si les valeurs sont présente dans tableau des validations
  const isFirst = formValidations.includes("first");
  const isLast = formValidations.includes("last");
  const isEmail = formValidations.includes("email");
  const isQuantity = formValidations.includes("nbChallenge");
  const isTown = formValidations.includes(true);
  const isDate = formValidations.includes("birthdate");
  const isCgu = formValidations.includes("cgu");

  // si elles ne sont pas présentes, je relance la fonction
  if (!isFirst) {
    checkName();
  }
  if (!isLast) {
    checkName();
  }
  if (!isEmail) {
    checkEmail();
  }
  if (!isDate) {
    checkBirthDate();
  }
  if (!isQuantity) {
    checkNbGame();
  }
  if (!isTown) {
    checkRadio();
  }
  if (!isCgu) {
    checkCGU();
  }
  // Si toutes les valeurs sont présente, je valide le form et affiche la modale de validation
  if (
    isFirst &&
    isLast &&
    isEmail &&
    isDate &&
    isQuantity &&
    isTown &&
    (isCgu || cgu.checked === true)
  ) {
    // Je vide les champs des inputs
    for (const key in inputs) {
      inputs[key].value = "";
    }
    // je supprime le formulaire s'il remplit les conditions
    formulaire.innerHTML = "";
    //je supprimes les données du tableau
    formValidations.length = 0;
    // MSG de validation de formulaire
    validationMessage();
  }
}
