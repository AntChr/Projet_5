let produitinLocalStorage = JSON.parse(localStorage.getItem("produit"));

fetch("http://localhost:3000/api/products")
    .then(async (rep) => {
        console.log(rep);
        const productID = await rep.json();
        // Affichage des produits du panier

        //Sélection de l'id où j'injecte le code HTML
        const positionpanier = document.querySelector("#cart__items");
        // Injection du HTML pour chaque produit dans le panier avec une boucle for
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
            const Contact = {
                firstName: document.querySelector("#firstName").value,
                lastName: document.querySelector("#lastName").value,
                adress: document.querySelector("#address").value,
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
                const lePrenom = Contact.firstName;
                if (regExPrenomNom(lePrenom)) {
                    document.querySelector("#firstNameErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#firstNameErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertPN("Prénom"))
                    return false
                };
            }

            function nomControle() {
                const leNom = Contact.lastName;
                if (regExPrenomNom(leNom)) {
                    document.querySelector("#lastNameErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#lastNameErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertPN("Nom"))
                    return false
                };
            }
            function adresseControle() {
                const LAdresse = Contact.adress;
                if (regExAdresseVille(LAdresse)) {
                    document.querySelector("#addressErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#addressErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertAV("Adresse"))
                    return false
                };
            }
            function villeControle() {
                const laVille = Contact.city;
                if (regExAdresseVille(laVille)) {
                    document.querySelector("#cityErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#cityErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert(textAlertAV("Ville"))
                    return false
                };
            }
            function mailControle() {
                const leMail = Contact.email;
                if (regExmail(leMail)) {
                    document.querySelector("#emailErrorMsg").textContent = ""
                    return true
                } else {
                    document.querySelector("#emailErrorMsg").textContent = "Veuillez bien remplir ce champ"
                    alert("L'email n'est pas valide")
                    return false
                };
            }

            // Récupération des valeurs du formulaire pour les mettre dans le local storage
            if (prenomControle() && nomControle() && adresseControle() && villeControle() && mailControle()) {
                localStorage.setItem("Contact", JSON.stringify(Contact));
            } else {
                alert("Veuillez bien remplir le formulaire");
            }
            // Récupération des id des produits
            let products = [];
            for (h = 0; h < produitinLocalStorage.length; h++) {
                let AllID = produitinLocalStorage[h].id_product;

                products.push(AllID)
                
            }
                localStorage.setItem("products",JSON.stringify(products));
            
            // Mettre les values du formulaire et les produits dans un objet à envoyer au serveur
            let aEnvoyer = {
                Contact,
                products
            };
            console.log(aEnvoyer);
           

            
            fetch('http://localhost:3000/api/order', {
                method: "POST",
                body: JSON.stringify(Contact,products),
                headers: {
                    "Content-Type": "application/json",

                },
            })
                .then((rep) => rep.json())
                .then((data)=>{
                    window.location.href = "confirmation.html?orderId="+ data.orderId
                localStorage.clear();})


            
        })
    })