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
console.log(sendError);
// gestions des validations
const formValidations = [];

// je place l'attribut required dans la checkbox
inputs.cgu.setAttribute("required", "");
// je place l'attribut required dans la checkbox
// inputs.cgu.setAttribute("checked", "");

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
 *
 * @param {string} value  le type de nettoyage voulu pour le msg d'erreur / le tableau des valeurs validées
 */
// function clearErrorValue(value) {
//   switch (value) {
//     case "form":
//       // supprime toutes les valeurs du tableaux
//       formValidations.length = 0;
//       break;
//     case "error":
//       // nettoye les messages d'erreur
//       sendError.textContent = "";
//       break;
//     case "all":
//       formValidations.length = 0;
//       sendError.textContent = "";
//       break;
//   }
// }

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
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    divFormData[index].classList.add("contain-error");
    sendError[index].classList.add("visible");
    sendError[index].textContent =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    // placement du message d'erreur
    return divFormData[index].appendChild(sendError);
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
    inputValue.target.parentNode.classList.remove("input-error");
    divFormData[2].classList.remove("contain-error");
    sendError.classList.remove("visible");
    formValidations.push("email");
  } else {
    inputValue.target.parentNode.classList.add("input-error");
    divFormData[2].classList.add("contain-error");
    sendError.classList.add("visible");
    return divFormData[2].appendChild(sendError);
  }
}

/**
 * @param {string} inputValue - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
// function checkBirthDate(inputValue) {
//   /**
//    * ^ = commence par ...
//    * (19|20)\d\d  = Doit commencer par 19 ou 20 et se fini par 2 chiffres
//    * [-/.]        = Doit avoir en separation ces caractères : - / .
//    * [0-9]        = Doit contenir que des nombres entre 0 et 9
//    */
//   if (/^(19|20)\d\d+[-/.]+[0-9]+[-/.][0-9]/.test(inputValue.target.value)) {
//     clearErrorValue("error");
//     formValidations.push("date");
//   } else {
//     sendError.textContent = "Vous devez entrer votre date de naissance.";
//     return divFormData[3].appendChild(sendError);
//   }
// }
/**
 * @param {string} evt - valeur envoyer de l'input
 * @returns  {string} en cas d'erreur
 */
function checkNbGame(evt = false) {
  console.log(evt.target.value === "" ? "oups" : "c'est ok");
  sendError.textContent = "Vous devez choisir une valeur numérique.";
  if (evt !== false) {
    console.log(evt.target.value);
    if (/[0-9]/.test(evt.target.value)) {
      evt.target.parentNode.classList.remove("input-error");
      sendError.classList.remove("visible");
      divFormData[4].classList.remove("contain-error");
      formValidations.push("nbChallenge");
    } else {
      divFormData[4].classList.add("contain-error");
      evt.target.parentNode.classList.add("input-error");
      sendError.classList.add("visible");
      return divFormData[4].appendChild(sendError);
    }
  } else if (inputs.nbGame.target.value === "" || inputs.nbGame.lenght === 0) {
    inputs.nbGame.parentNode.classList.add("input-error");
    sendError.classList.add("visible");
    return divFormData[4].appendChild(sendError);
  }
}
/**
 * @param {boolean} evt - par défault la valeur est false
 * @returns  {string} en cas d'erreur
 */
// function checkRadio(evt = false) {
//   if (!evt) {
//     sendError.textContent = "Vous devez choisir une option.";
//     return divFormData[5].appendChild(sendError);
//   } else if (evt.target.checked) {
//     formValidations.push(evt.target.checked);
//   }
// }
/**
 * @param {boolean} evt - par défault la valeur est true
 * @returns  {string} en cas d'erreur
 */
// function checkCGU(evt = true) {
//   // Cible le 1er label près de l'id cgu
//   const labelCgu = document.querySelector("#cgu").nextSibling;
//   // si la valeur est présente
//   if (cgu.checked || evt.target.checked) {
//     // j'hote l'attribut
//     submitFormBtn.removeAttribute("disabled");
//     // et replace la bonne couleur au btn
//     submitFormBtn.style.backgroundColor = "#fe142f";
//     clearErrorValue("error");
//     formValidations.push("cgu");
//   } else {
//     // Si l'on ne valide pas les CGUs le bouton n'est plus fonctionnel
//     submitFormBtn.setAttribute("disabled", "");
//     // et change de couleur.
//     submitFormBtn.style.backgroundColor = "darkred";
//     // je vérifie si la valeur est présente dan le tableau
//     const isCgu = formValidations.includes("cgu");
//     if (isCgu) {
//       // sil elle est présente, je la supprime.
//       formValidations.pop("cgu");
//     }
//     sendError.style.display = "inline-blocK";
//     sendError.textContent =
//       "Vous devez vérifier que vous acceptez les termes et conditions.";
//     return labelCgu.after(sendError);
//   }
// }

// function checkFormValidation() {
//   for (let index = 0; index < formValidations.length; index++) {
//     console.table(
//       `${formValidations[index]} => ${typeof formValidations[index]}`,
//     );
//   }
//   // je check si les valeurs sont présente dans tableau des validations
//   const first = formValidations.includes("first");
//   const last = formValidations.includes("last");
//   const email = formValidations.includes("email");
//   const naissance = formValidations.includes("quantity");
//   const ville = formValidations.includes(true);
//   const nbChallenge = formValidations.includes("nbChallenge");
//   const isCgu = formValidations.includes("cgu");

//   // si elles ne sont pas présentes, je relance la fonction
//   if (!first) {
//     checkName();
//   }
//   if (!last) {
//     checkName();
//   }
//   if (!email) {
//     checkEmail();
//   }
//   if (!naissance) {
//     checkBirthDate();
//   }
//   if (!nbChallenge) {
//     checkNbGame();
//   }
//   if (!ville) {
//     checkRadio();
//   }

//   if (!isCgu) {
//     checkCGU();
//   }
//   if ((isCgu || cgu.checked) && ville) {
//     // je supprime le formulaire s'il remplit les conditions
//     formulaire.innerHTML = "";
//     // je vide le tabeau des validation et efface les MSGs d'erreur
//     clearErrorValue("all");
//     // MSG de validation de formulaire
//     validationMessage();
//   }
// }
