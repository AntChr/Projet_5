// Variable qui contient les données contenu dans le local storage
let produitinLocalStorage = JSON.parse(localStorage.getItem("produit"));

// Appel du serveur pour récupérer les données des produits
fetch("http://localhost:3000/api/products")
    .then(async (rep) => {
        
        const productID = await rep.json();

        //Sélection de l'id où j'injecte le code HTML
        const positionpanier = document.querySelector("#cart__items");
        // Injection du HTML pour chaque produit dans le panier avec une boucle for
        // Recherche du produit dans la base de donnée en fonction de l'id des produits présent dans le local storage
        let ProduitPanier = [];
        for (j = 0; j < produitinLocalStorage.length; j++) {
                ProduitPanier += `<article class="cart__item" data-id="${produitinLocalStorage[j]._idproduct}" data-color="${produitinLocalStorage[j].couleur}">
            <div class="cart__item__img">
            <img src="${productID.find(x => x._id === produitinLocalStorage[j].id_product).imageUrl}" alt="${productID.find(x => x._id === produitinLocalStorage[j].id_product).altTxt}">
            </div>
            <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${productID.find(x => x._id === produitinLocalStorage[j].id_product).name}</h2>
                <p>${produitinLocalStorage[j].couleur}</p>
                <p>${productID.find(x => x._id === produitinLocalStorage[j].id_product).price} €</p>
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
                window.location.reload(true);
            })
        });


        // Modifier quantité produit
        // position des la rubrique quantité

        let modifquantite = document.querySelectorAll(".itemQuantity");

        modifquantite.forEach((qte, m) => {
            qte.addEventListener("change", p => {
                produitinLocalStorage[m].quantite = parseInt(modifquantite[m].value);
                localStorage.setItem("produit", JSON.stringify(produitinLocalStorage));
                window.location.reload(true);
            })

        });

        // Prix total du panier 
        let prixTotalCalcul = [];
        let quantiteTotalPanier = [];

        const positionquantitetotal = document.querySelector("#totalQuantity")
        const positionprixtotal = document.querySelector("#totalPrice")

        for (g = 0; g < produitinLocalStorage.length; g++) {

            let prixProduitsPanier = productID.find(x => x._id === produitinLocalStorage[g].id_product).price * produitinLocalStorage[g].quantite;
            let quantitePanier = produitinLocalStorage[g].quantite;

            prixTotalCalcul.push(prixProduitsPanier)
            quantiteTotalPanier.push(quantitePanier)
            
        }
        
    
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const prixTotal = prixTotalCalcul.reduce(reducer, 0);
        const quantiteTotal = quantiteTotalPanier.reduce(reducer);
        

        positionquantitetotal.innerHTML = quantiteTotal;
        positionprixtotal.innerHTML = prixTotal;


        // Selection du bouton commander
        const positionbtnorder = document.querySelector("#order");

        // addEventlistener lorsqu'on clique sur le bouton commander
        positionbtnorder.addEventListener("click", (e) => {
            e.preventDefault();
            const contact = {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                address: document.querySelector("#address").value,
                city: document.querySelector("#city").value,
                email: document.querySelector("#email").value,
            }

            // Gestion Formulaire
            // Contrôle du prénom
            const textAlertPN = (value) => {
                return `Le Champ ${value} doit contenir uniquement entre 3 et 20 lettres`
            }
            const textAlertAV = (value) => {
                return `Le Champ ${value} doit contenir au minimum 3 caractères`
            }
            // Regex du prénom et du nom, 3 à 20 caractères minuscules et majuscules avec tiret
            const regExPrenomNom = (value) => {
                return /^([A-Za-z]{3,10})?([-]{0,1})?([A-Za-z]{3,10})$/.test(value);
            }
            // Regex de l'adresse et de la ville, 3 à 30 caractères minuscules et majuscules ainsi que les chiffres
            const regExAdresseVille = (value) => {
                return /^[0-9A-Za-z, ]{3,30}$/.test(value)
            }
            // Regex de l'email
            const regExmail = (value) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
            }
            // Contrôle du prénom en fonction du regex, envoi d'un message d'alerte si le regex n'est pas respecté
            function prenomControle() {
                const lePrenom = contact.firstName;
                if (regExPrenomNom(lePrenom)) {
                    document.querySelector("#firstNameErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#firstNameErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertPN("Prénom"))
                    return false
                };
            }
            // Contrôle du nom en fonction du regex, envoi d'un message d'alerte si le regex n'est pas respecté
            function nomControle() {
                const leNom = contact.lastName;
                if (regExPrenomNom(leNom)) {
                    document.querySelector("#lastNameErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#lastNameErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertPN("Nom"))
                    return false
                };
            }
            // Contrôle de l'adresse en fonction du regex, envoi d'un message d'alerte si le regex n'est pas respecté
            function adresseControle() {
                const LAdresse = contact.address;
                if (regExAdresseVille(LAdresse)) {
                    document.querySelector("#addressErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#addressErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertAV("Adresse"))
                    return false
                };
            }
            // Contrôle de la ville en fonction du regex, envoi d'un message d'alerte si le regex n'est pas respecté
            function villeControle() {
                const laVille = contact.city;
                if (regExAdresseVille(laVille)) {
                    document.querySelector("#cityErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#cityErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertAV("Ville"))
                    return false
                };
            }
            // Contrôle du mail en fonction du regex, envoi d'un message d'alerte si le regex n'est pas respecté
            function mailControle() {
                const leMail = contact.email;
                if (regExmail(leMail)) {
                    document.querySelector("#emailErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#emailErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert("L'email n'est pas valide")
                    return false
                };
            }
            // ajout dans un tableau de toutes les ID présent dans le local storage
            let products_Id = [];
            for (h = 0; h < produitinLocalStorage.length; h++) {
                let AllID = produitinLocalStorage[h].id_product;

                products_Id.push(AllID)
                
            }
            // Récupération des valeurs du formulaire pour les mettre dans le local storage
            if (prenomControle() && nomControle() && adresseControle() && villeControle() && mailControle()) {
                // Envoi des données du contact et des id au server pour qu'il retourne un numéro de confirmation
                fetch('http://localhost:3000/api/products/order', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
    
                    },
                    body: JSON.stringify({
                        contact:contact,
                        products:products_Id
                    }),
                })
                .then((rep)=>rep.json())
                .then((data)=>{
                    // Ajout dans l'URL de la page confirmation du numéro de confirmation
                        window.location.href = "confirmation.html?orderId="+ data.orderId
                        
                    })
            } else {
                alert("Veuillez bien remplir le formulaire");
            }   
        })
    })