let products = [];
const GetData= async () => {
     await fetch("http://localhost:3000/api/products")// Chercher les données de l'API
     .then(rep => rep.json())
     .then(data => products = data)
     .catch(error => console.log(error)) 
}


const items = document.querySelector('#items');
const DisplayData = (array) => {
    
    for( let product of array) {
        const item = `<a href="./product.html?id=${product._id}"><article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article></a>`
        items.innerHTML += item
    }
}
await GetData();
DisplayData (products);
