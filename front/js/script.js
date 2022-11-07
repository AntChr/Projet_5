// Chercher les données de l'API
let products = [];
let GetData = async () => {
     await fetch("http://localhost:3000/api/products")
     .then(rep => rep.json())
     .then(data => products = data)
     .catch(error => console.log(error)) 
}

// Position dans le HTML pour injecter les donnnées souhaitées
const items = document.querySelector('#items');
let DisplayData = (array) => {
    
    // Boucle for pour injecter tous les produits de la base de donnée dans le HTML
    for( let product of array) {
        const item = `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article></a>`
        items.innerHTML += item
    }
}
// Appel de la fonction pour déployer les données

await GetData();

// Lancement de la fonction avec les produits de la base de donnée
DisplayData (products);
