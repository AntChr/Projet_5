// Récupération du numéro de confirmation dans l'URL
let url = new URLSearchParams(window.location.search);

let id = url.get("orderId");
localStorage.clear();
// Injection du numéro de confirmation dans le code HTML
const positionconfirmation = document.querySelector("#orderId")

positionconfirmation.innerHTML = id;