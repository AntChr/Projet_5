let url = new URLSearchParams(window.location.search);

let id = url.get("orderId");
localStorage.clear();

const positionconfirmation = document.querySelector("#orderId")

positionconfirmation.innerHTML = id;