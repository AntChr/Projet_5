let produitinLocalStorage = JSON.parse(localStorage.getItem("produit"));


// Affichage des produits du panier

//Sélection de l'id où j'injecte le code HTML
const positionpanier = document.querySelector("#cart__items");

// Injection du HTML pour chaque produit dans le panier avec une boucle for
let ProduitPanier = [];

for (j = 0; j < produitinLocalStorage.length; j++) {

    ProduitPanier += `<article class="cart__item" data-id="${produitinLocalStorage[j].id_product}" data-color="${produitinLocalStorage[j].couleur}">
    <div class="cart__item__img">
    <img src="${produitinLocalStorage[j].image}" alt="${produitinLocalStorage[j].altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
        <h2>${produitinLocalStorage[j].nom}</h2>
        <p>${produitinLocalStorage[j].couleur}</p>
        <p>${produitinLocalStorage[j].prix} €</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitinLocalStorage[j].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
    </article>`;
    positionpanier.innerHTML = ProduitPanier;
}

// Supprimer l'article

// position de tous les boutons supprimer
let btn_supprimer = document.querySelectorAll(".deleteItem");

// Fonction pour supprimer le produit du local Storage
function deleteItemSelect(index) {
    produitinLocalStorage.splice(index, 1);
    localStorage.setItem("produit", JSON.stringify(produitinLocalStorage));

    if (produitinLocalStorage.length === 0) {
        localStorage.removeItem("produit");
    }
}
// suppression du produit en cliquant sur le bouton
btn_supprimer.forEach((btn, i) => {
    btn.addEventListener("click", e => {
        deleteItemSelect(i);
        window.location.href = window.location.href;
    })
});


// Modifier quantité produit
// position des la rubrique quantité

let modifquantite = document.querySelectorAll(".itemQuantity");

modifquantite.forEach((qte, m) => {
    qte.addEventListener("change", p => {
        produitinLocalStorage[m].quantite = parseInt(modifquantite[m].value);
        localStorage.setItem("produit", JSON.stringify(produitinLocalStorage));
        window.location.href = window.location.href;
    })
    console.log(produitinLocalStorage.quantite);

});

// Prix total du panier
let prixTotalCalcul = [];
let quantiteTotalPanier = [];

const positionquantitetotal = document.querySelector("#totalQuantity")
const positionprixtotal = document.querySelector("#totalPrice")

for (g = 0; g < produitinLocalStorage.length; g++) {

    let prixProduitsPanier = produitinLocalStorage[g].prix * produitinLocalStorage[g].quantite;
    let quantitePanier = produitinLocalStorage[g].quantite;

    prixTotalCalcul.push(prixProduitsPanier)
    quantiteTotalPanier.push(quantitePanier)

}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);
const quantiteTotal = quantiteTotalPanier.reduce(reducer);


positionquantitetotal.innerHTML = quantiteTotal;
positionprixtotal.innerHTML = prixTotal;

// Formulaire de commande

const afficherFormulaireHtml = () => {

    //Position du formulaire dans le HTML 
    const positionFormulaire = document.querySelector(".cart__order");
    const structureFormulaire = `<div class="cart__order">
    <form method="get" class="cart__order__form">
      <div class="cart__order__form__question">
        <label for="firstName">Prénom: </label>
        <input type="text" name="firstName" id="firstName" required>
        <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
      </div>
      <div class="cart__order__form__question">
        <label for="lastName">Nom: </label>
        <input type="text" name="lastName" id="lastName" required>
        <p id="lastNameErrorMsg"></p>
      </div>
      <div class="cart__order__form__question">
        <label for="address">Adresse: </label>
        <input type="text" name="address" id="address" required>
        <p id="addressErrorMsg"></p>
      </div>
      <div class="cart__order__form__question">
        <label for="city">Ville: </label>
        <input type="text" name="city" id="city" required>
        <p id="cityErrorMsg"></p>
      </div>
      <div class="cart__order__form__question">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" required>
        <p id="emailErrorMsg"></p>
      </div>
      <div class="cart__order__form__submit">
        <input type="submit" value="Commander !" id="order">
      </div>
    </form>
  </div>`

    // Injection HTML
    positionFormulaire.innerHTML = structureFormulaire;
}

// Selection du bouton commander
const positionbtnorder = document.querySelector("#order");

// addEventlistener lorsqu'on clique sur le bouton commander
positionbtnorder.addEventListener("click", (e) => {
    e.preventDefault();
    const FormulaireValues = {
        prenom: document.querySelector("#firstName").value,
        nom: document.querySelector("#lastName").value,
        adresse: document.querySelector("#address").value,
        ville: document.querySelector("#city").value,
        mail: document.querySelector("#email").value,
    }

    // Gestion Formulaire
    // Contrôle du prénom
    const textAlertPN = (value) => {
        return `Le Champ ${value} doit contenir uniquement entre 3 et 20 lettres`
    }
    const textAlertAV = (value) => {
        return `Le Champ ${value} doit contenir au minimum 3 caractères`
    }
    const regExPrenomNom = (value) => {
        return /^([A-Za-z]{3,10})?([-]{0,1})?([A-Za-z]{3,10})$/.test(value);
    }
    const regExAdresseVille = (value) => {
        return /^[0-9A-Za-z, ]{3,30}$/.test(value)
    }
    const regExmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    function prenomControle() {
        const lePrenom = FormulaireValues.prenom;
        if (regExPrenomNom(lePrenom)) {
            document.querySelector("#firstNameErrorMsg").textContent=""
            return true
        } else {
            document.querySelector("#firstNameErrorMsg").textContent="Veuillez bien remplir ce champ"
            alert(textAlertPN("Prénom"))
            return false
        };
    }

    function nomControle() {
        const leNom = FormulaireValues.nom;
        if (regExPrenomNom(leNom)) {
            document.querySelector("#lastNameErrorMsg").textContent=""
            return true
        } else {
            document.querySelector("#lastNameErrorMsg").textContent="Veuillez bien remplir ce champ"
            alert(textAlertPN("Nom"))
            return false
        };
    }
    function adresseControle() {
        const LAdresse = FormulaireValues.adresse;
        if (regExAdresseVille(LAdresse)) {
            document.querySelector("#addressErrorMsg").textContent=""
            return true
        } else {
            document.querySelector("#addressErrorMsg").textContent="Veuillez bien remplir ce champ"
            alert(textAlertAV("Adresse"))
            return false
        };
    }
    function villeControle() {
        const laVille = FormulaireValues.ville;
        if (regExAdresseVille(laVille)) {
            document.querySelector("#cityErrorMsg").textContent=""
            return true
        } else {
            document.querySelector("#cityErrorMsg").textContent="Veuillez bien remplir ce champ"
            alert(textAlertAV("Ville"))
            return false
        };
    }
    function mailControle() {
        const leMail = FormulaireValues.mail;
        if (regExmail(leMail)) {
            document.querySelector("#emailErrorMsg").textContent=""
            return true
        } else {
            document.querySelector("#emailErrorMsg").textContent="Veuillez bien remplir ce champ"
            alert("L'email n'est pas valide")
            return false
        };
    }
    // Récupération des valeurs du formulaire pour les mettre dans le local storage
    if (prenomControle() && nomControle() && adresseControle() && villeControle() && mailControle()) {
        localStorage.setItem("FormulaireValues", JSON.stringify(FormulaireValues));
    } else {
        alert("Veuillez bien remplir le formulaire");
    }
    // Mettre les values du formulaire et les produits dans un objet à envoyer au serveur
    const aEnvoyer = {
        produitinLocalStorage,
        FormulaireValues
    };

    const exportData = fetch('http://localhost:3000/api/products', {
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers: {
            "Content-Type" : "application/json",
        },
    })

})


