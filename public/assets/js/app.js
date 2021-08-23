/**
 *URL para consumir API
 */
const API_CATEGORIES = "http://147.182.160.199/api/categories";
const API_PRODUCTS = "http://147.182.160.199/api/products";

/**
 *Variables que serán usadas como parámetros GET
 */
let category_id = null;
let character_like = null;
let filterType = null;

/**
 *Constantes de contenedores HTML
 */
const htmlCategories = document.querySelector("#categories");
const htmlProducts = document.querySelector("#products");
const inputSearch = document.querySelector('#searchProduct');

/**
 *Métodos que se ejecutan al cargar la vista para desplegar los productos y/o categorías
 */
addElementCategory();
addElementProducts(getProductsApiUrl(category_id, filterType));
listenToEvents();

/**
 * Función que escucha eventos para realizar peticiones a la pai según corresponda
 */
function listenToEvents(){
	document.addEventListener('click', isCategory)
	inputSearch.addEventListener('input', searchProducts);
}

/**
 *Recibe la propiedad event y si el evento fue disparado sobre la etiqueta <li> llama a 
 *las funciones correspondientes para actvar la categorpía e imprimir los productos
 */
function isCategory	(e){
	if(e.target.tagName.toLowerCase() === 'li'){
	    category_id = e.target.value;
	    filterType = 'byCategory';	    
	    activateCategory(e);
	    addElementProducts(getProductsApiUrl(category_id, filterType));
	}
}

/**
 *Función que agrega la clase "active" al elemento que disparó el evento
 */
function activateCategory(e){
	htmlCategories.querySelectorAll('li').forEach(function(userItem) {
	  userItem.classList.remove("active");
	});
	e.target.classList.add("active");
}

/**
 *Función que genera las variables que serán enviadas como parámetros 
 *para construir la ruta de la api
 */
function searchProducts(e){
	character_like = e.target.value;
	filterType = 'searchProducts'
	addElementProducts(getProductsApiUrl(character_like, filterType));
}

/**
 *Función que se encarga de hacer una petición a la URL de la API 
 *de Categorías y enviar a renderizar el json obtenido
 */
function addElementCategory(){
	console.log(API_CATEGORIES);
	fetch(API_CATEGORIES)	
	.then((response) => response.json())
	.then((categories) => {
		for (category of categories){
			renderCategory(category);	    	
	    } 
	});	
}

/**
 *Función que se encarga de hacer una petición a la URL de la API de 
 *Productos que recibe y enviar a renderizar el json obtenido
 */
function addElementProducts(apiURl){	
	console.log(apiURl)
	fetch(apiURl)
	.then((response) => response.json())
	.then((products) => {		
		htmlProducts.innerHTML = "";		
		for(product of products){
			renderProduct(product);
		}
	});	
}

/**
 *Función que se encarga de añadir los endpoints a la API para productos
 */
function getProductsApiUrl(data, filterType){
	if(data && filterType == 'byCategory'){
		return API_PRODUCTS+'?category_id='+data;
	}
	if(data && filterType == 'searchProducts'){
		return API_PRODUCTS+'?character='+data;
	}
	return API_PRODUCTS;
}







