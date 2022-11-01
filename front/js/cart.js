let produitinLocalStorage = JSON.parse(localStorage.getItem("produit"));


// Affichage des produits du panier

//Sélection de l'id où j'injecte le code HTML
const positionpanier = document.querySelector("#cart__items");

// Injection du HTML pour chaque produit dans le panier avec une boucle for
let ProduitPanier =[];

for(j = 0; j < produitinLocalStorage.length; j++){

    ProduitPanier = ProduitPanier +`<article class="cart__item" data-id="${produitinLocalStorage[j].id_product}" data-color="${produitinLocalStorage[j].couleur}">
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
let btn_supprimer= document.querySelectorAll(".deleteItem");

// suppression du produit en cliquant sur le bouton
btn_supprimer.forEach((btn,i) => {
    btn.addEventListener("click", e => {
        deleteItemSelect(i);
        window.location.href = window.location.href;
    })
});
// Fonction pour supprimer le produit du local Storage
function deleteItemSelect(index) {
    produitinLocalStorage.splice(index,1);
    localStorage.setItem("produit", JSON.stringify(produitinLocalStorage));

    if (produitinLocalStorage.length === 0) {
        localStorage.removeItem("produit");
    }
}

// Modifier quantité produit
// position des la rubrique quantité

let modifquantite = document.querySelectorAll(".itemQuantity");

modifquantite.forEach((qte,m) => {
    qte.addEventListener("change", p => {
        produitinLocalStorage[m].quantite = modifquantite[m].value;
        localStorage.setItem("produit",JSON.stringify(produitinLocalStorage));
    })
    console.log(produitinLocalStorage.quantite);
    
});

// Prix total du panier
let prixTotalCalcul =[];
let quantiteTotalPanier =[];

const positionquantitetotal = document.querySelector("#totalQuantity")
const positionprixtotal = document.querySelector("#totalPrice")

for ( g = 0; g<produitinLocalStorage.length; g++ ) {

let prixProduitsPanier = produitinLocalStorage[g].prix*produitinLocalStorage[g].quantite;
let quantitePanier = parseInt(produitinLocalStorage[g].quantite);

prixTotalCalcul.push(prixProduitsPanier)
quantiteTotalPanier.push(quantitePanier)

}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);
const quantiteTotal = quantiteTotalPanier.reduce(reducer);


positionquantitetotal.innerHTML= quantiteTotal;
positionprixtotal.innerHTML= prixTotal;
