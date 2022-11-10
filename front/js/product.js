// récupération de l'id de l'URL
const lien = document.URL;
var url = new URL(lien);
var id = url.searchParams.get("id");

// Position de tous les éléments pour injecter dans le HTML
const positionimg = document.querySelector('.item__img');
const positiontitle = document.querySelector('#title');
const positionprix = document.querySelector('#price');
const positiondescription = document.querySelector('#description');
const positioncouleur = document.querySelector('#colors');

// affichage produit sélectionné par l'id
fetch(`http://localhost:3000/api/products/${id}`)
     .then(async (rep) => {
          const productID = await rep.json();


          //Sélection de l'id où on injecte le code HTMl pour le titre

          positiontitle.innerHTML = productID.name;

          //Sélection de l'id où on injecte le code HTMl pour le prix

          positionprix.innerHTML = productID.price;

          //Sélection de l'id où on injecte le code HTMl pour la description

          positiondescription.innerHTML = productID.description;

          //Injection dans le HTMl pour chaque spécifié dans la base de donnée
          productID.colors.forEach(color => {
               positioncouleur.innerHTML += `<option value="${color}">${color}</option>`
          });


          const produitimage = `<img src="${productID.imageUrl}" alt="${productID.altTxt}">`;
          positionimg.innerHTML = produitimage;

          // Gestion Panier

          // Récupération des données sélectionnées par l'utilisateur et envoie du panier





          // Sélecttion du bouton Ajouter l'article au panier
          const btn_envoyerpanier = document.querySelector("#addToCart");

          // Ecouter le bouton et envoyer
          if (btn_envoyerpanier !== null){
          btn_envoyerpanier.addEventListener("click", (event) => {
               event.preventDefault();
           // Sélection de l'id du formulaire couleur
          let couleur = document.querySelector("#colors").value;


          // Sélection de l'id du formulaire quantité
          let quantite = document.querySelector("#quantity").value;

               // Récupération des valeurs du formulaire
               let optionsProduit = {
                    id_product: productID._id,
                    couleur: couleur,
                    quantite: Number(quantite)
               }

               // Local Storage

               // Fonction fenêtre pop up qui redirige vers le panier ou la page du produit 
               const fenConfirmation = () => {
                    if (window.confirm(` ${quantite} ${productID.name} couleur : ${couleur} a bien été ajouté au panier
  consultez le panier  en cliquant sur OK `)) {
                         window.location.href = "./cart.html";
                    } else {
                         window.location.reload(true);
                    }
               }
               // Fonction qui envoie une alerte et empêche l'envoie au panier si il y aucune quantité ou couleur
               function NoItem (p) {
                    if (!quantite || !couleur){
                         alert("La quantité ou la couleur n'a pas été selectionné")
                    } else if(quantite <1 || quantite >100){
                         alert("Veuillez selectionner une quantitée compris entre 1 et 100")
                    } else
                         {
                         fenConfirmation();
                         localStorage.setItem("produit", JSON.stringify(p));
                    }
               }

               // Fonction pour ajouter le produit dans le local Storage et renvoit un tableau vide lorsqu'il y a rien dans le local Storage
               function getProduit() {
                    let items = localStorage.getItem("produit");
                    if (items == null) {
                         return [];
                    } else {
                         return JSON.parse(items);
                    }
               }
               // Fonction pour ajouter un produit ayant le même id et couleur qu'un produit déjà présent dans le panier
               function addProduct(product) {
                    let items = getProduit();
                    let foundProduct = items.find(elt => elt.id_product == product.id_product && elt.couleur == product.couleur);
                    console.log(foundProduct);
                    if (foundProduct != undefined) {
                         foundProduct.quantite = foundProduct.quantite + product.quantite;
                         if (foundProduct.quantite > 100) {
                              alert("La quantitée maximale est dépassée")
                         } else {
                              NoItem(items)
                         }
                    } else {
                         items.push(product);
                         NoItem(items);
                    }
                    
               }
               addProduct(optionsProduit);

          })}

     })

     .catch(error => console.log(error))











