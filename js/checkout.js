// Exercici 8

// Estils d'error - Els he fet amb CSS perquè la propia documentació de bootstrap diu que is-invalid no esta disponible encara

// FALTA
// -Ajustar el missatge d'error a cada error d'input: camp obligatori, no numeros etc

// Get the input fields
const nom = document.querySelector(".name");
const email = document.querySelector(".email");
const adress = document.querySelector(".adress");
const lastName = document.querySelector(".lastName");
const password = document.querySelector(".password");
const phone = document.querySelector(".phone");

const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form input");

// Get the error elements
var errorName = document.getElementById("errorName");
var errorEmail = document.getElementById("errorEmail");
var errorAdress = document.getElementById("errorAdress");
var errorLastName = document.getElementById("errorLastName");
var errorPassword = document.getElementById("errorPassword");
var errorPhone = document.getElementById("errorPhone");

const expresions = {
  name: /^[a-zA-ZÀ-ÿ]{3,}$/,
  email: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+\.[a-zA-Z0-9-.]/,
  adress: /\w+/, // TO-DO
  lastName: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
  password: /^[a-zA-Z0-9]{3,12}$/,
  phone: /^\d{7,14}$/,
};

form.addEventListener("submit", validate);
inputs.forEach((input) => {
  input.addEventListener("keyup", validate); // opcional, que el missatge surti cada cop que aixequem una tecla molesta una mica
  input.addEventListener("blur", validate); // al clicar fora també validem
});

// L'he volgut fer dinàmica: no faig servir els id individuals de cada missatge d'error perquè m'obligava a escriure un switch molt llarg. Potser no és la manera standard de ferho però volia veure si ho aconseguia fer no hardcoded.
function validate(e) {
  e.preventDefault();
  console.log(`Funció validate activada`);
  for (let exp in expresions) {
    // recorre l'objecte expresions i comprova si el nom de l'element que ha disparat l'event coincideix amb la clau exp de expresions
    if (exp === e.target.name) {
      //aquí fem la comprovació regEx adaptada a cada camp
      if (expresions[exp].test(e.target.value)) {
        console.log("Correct " + exp);
        document.querySelector("." + exp + " p").classList.add("hidden");

        document
          .querySelector("." + exp + " input")
          .classList.remove("border-danger");
      } else {
        console.log("Incorrect " + exp);
        document.querySelector("." + exp + " p").classList.remove("hidden");
        document
          .querySelector("." + exp + " input")
          .classList.add("border-danger");
      }
    }
  }
}
