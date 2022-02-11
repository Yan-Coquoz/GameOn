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
const closeBtn = document.querySelector(".close");
const formulaire = document.querySelector("form");
const submitBtn = document.querySelector(".btn-submit");
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const email = document.querySelector("#email");

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
function myForm() {
  console.log(`nom : ${nom.value}
prenom : ${prenom.value}
email : ${email.value}`);
}
