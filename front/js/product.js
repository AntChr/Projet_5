// récupération de l'id de l'URL
const lien = document.URL;
var url = new URL(lien);
var id = url.searchParams.get("id");


const positionimg = document.querySelector('.item__img');
const positiontitle = document.querySelector('#title');
const positionprix = document.querySelector('#price');
const positiondescription = document.querySelector('#description');
const positioncouleur = document.querySelector('#colors');

// affichage produit sélectionné par l'id
fetch(`http://localhost:3000/api/products/${id}`)
     .then(async (rep) => {
          console.log(rep);
          const productID = await rep.json();


          //Sélection de l'id où on injecte le code HTMl pour le titre
          
          positiontitle.innerHTML = productID.name;

          //Sélection de l'id où on injecte le code HTMl pour le prix
          
          positionprix.innerHTML = productID.price;

          //Sélection de l'id où on injecte le code HTMl pour la description
          
          positiondescription.innerHTML = productID.description;

          //Sélection de l'id où on injecte le code HTMl pour la couleur
          productID.colors.forEach(color => {
               positioncouleur.innerHTML += `<option value="${color}">${color}</option>`});
          
          
          const produitimage = `<img src="${productID.imageUrl}" alt="${productID.altTxt}">`;
          positionimg.innerHTML = produitimage;

          // Gestion Panier

          // Récupération des données sélectionnées par l'utilisateur et envoie du panier

          // Sélection de l'id du formulaire couleur
          const idcouleur = document.querySelector("#colors");
          

          // Sélection de l'id du formulaire quantité
          const idquantite = document.querySelector("#quantity");



          // Sélecttion du bouton Ajouter l'article au panier
          const btn_envoyerpanier = document.querySelector("#addToCart");
          console.log(btn_envoyerpanier);

          // Ecouter le bouton et envoyer
          btn_envoyerpanier.addEventListener("click", (event)=>{
               event.preventDefault();

               // Choix de la couleur de l'utilisateur dans une variable
                    const couleurchoisi = idcouleur.value;
                    console.log(couleurchoisi);
                    
               // Choix de la quantité de l'utilisateur dans une variable
                    const quantiteselect = idquantite.value;
                    console.log(quantiteselect);

               // Récupération des valeurs du formulaire
               let optionsProduit = {
                    nom: productID.name,
                    image: productID.imageUrl,
                    altTxt: productID.altTxt,
                    id_product: productID._id,
                    couleur: couleurchoisi,
                    quantite: quantiteselect,
                    prix: productID.price,
               }
               console.log(optionsProduit);

               // Local Storage
               // Stocker la récupération des valeurs du formulaire dans le local storage

               // Variable qui contient les key et les values qui seront dans le local storage

               let produitinLocalStorage = JSON.parse(localStorage.getItem("produit"))
               //Converti le local storage qui est JSON en objet JavaScript

               console.log(produitinLocalStorage);
               // Fonction fenêtre pop up qui redirige vers le panier ou l'accueil si la personne veut selectionner d'autres produits
               const fenConfirmation = () => {
                    if(window.confirm( ` ${quantiteselect} ${productID.name} couleur : ${couleurchoisi} a bien été ajouté au panier
  consultez le panier OK ou revenir à l'accueil ANNULER `)){
                         window.location.href="./cart.html";
                    } else {
                         window.location.href="./index.html";
                    }
               }
               

               // Fonction ajouter un produit dans le local storage
               const ajoutProduitLocalStorage = () => {
                    //Ajoute dans le tableau objet optionsProduit les values (couleurs,quantité) choisi par l'utilisateur
                    produitinLocalStorage.push(optionsProduit);
                    // Transformation en format JSON et envoi dans le local storage sous le nom "produit"
                    localStorage.setItem("produit",JSON.stringify(produitinLocalStorage));
               };
               // Si il y a déjà des produits d'enregistré dans le local storage
               if(produitinLocalStorage){
                    ajoutProduitLocalStorage();
                    fenConfirmation ();

               }
               //Si il n'y a pas de produit d'enregistré dans le local storage
               else{
                    produitinLocalStorage =[];
                    ajoutProduitLocalStorage();
                    fenConfirmation ();
               }
          })  
     })

     .catch(error => console.log(error)) 

     


    






