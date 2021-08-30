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
let infoType = null;

/**
 *Constantes de elementos HTML
 */
const htmlCategories = document.querySelector("#categories");
const htmlProducts = document.querySelector("#products");
const htmlSearchInfo = document.querySelector('#searchInfo');
const inputSearch = document.querySelector('#searchProduct');
const btnSearch = document.querySelector('#searchButton');
const quantityProducts = document.querySelector('#quantityProducts');
const contentAlert = document.querySelector('#contentAlert');

/**
 *Constantes de templates
 */
const templateAdditionalInfo = document.querySelector('#templateAdditionalInfo');
const templateLoadingIndicator = document.querySelector("#templateLoadingIndicator");
const templateProduct = document.querySelector("#templateProduct");
const templateCategory = document.querySelector("#templateCategory");
const templateProductQuantity = document.querySelector("#templateProductQuantity");

/**
 *Métodos que se ejecutan al cargar la vista para desplegar los productos y/o categorías
 */
addLoadingIndicator();
addElementCategory();
addElementProducts(getProductsApiUrl(category_id, filterType));
listenToEvents();

/**
 * Escucha eventos para realizar peticiones a la API según corresponda
 */
function listenToEvents(){
	document.addEventListener('click', isCategory)
	btnSearch.addEventListener('click', searchProducts);
	inputSearch.addEventListener("keyup", enterValidate);
}

/**
 *Recibe la propiedad event y si el evento fue disparado sobre la etiqueta <li> llama a 
 *las funciones correspondientes para actvar la categorpía e imprimir los productos
 */
function isCategory	(e){
	if(e.target.tagName.toLowerCase() === 'li'){
	    category_id = e.target.value;
	    category_name = e.target.dataset.name;
	    filterType = 'byCategory';
	    searchType = 'category';
	    clearContainerHTML(contentAlert);	
		renderAdditionalInfo(category_name, searchType);	    
	    activateCategory(e);
	    addLoadingIndicator();   
	    addElementProducts(getProductsApiUrl(category_id, filterType));
	}
}

/**
 *Función que agrega la clase "active" al elemento que disparó el evento
 */
function activateCategory(e){	
	removeActiveCategory();
	e.target.classList.add("active");
}

/**
 *Función que genera las variables que serán enviadas como parámetros 
 *para construir la ruta de la api
 */
function searchProducts(e){ 
	character_like = inputSearch.value;
	if(validateText()){
		filterType = 'searchProducts';
		searchType = 'search'
		clearContainerHTML(contentAlert);	
		renderAdditionalInfo(character_like, searchType);
		addLoadingIndicator();
		removeActiveCategory();
		addElementProducts(getProductsApiUrl(character_like, filterType));		
	}
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
		clearContainerHTML(htmlProducts);	
		clearContainerHTML(quantityProduts);

		let i = 0;
		for(product of products){
			renderProduct(product);
			i++;
		}
		renderProductsQuantity(i);
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

/**
 *Inserta loading indicator en contenedor
 */
 function addLoadingIndicator(){
	let template = document.importNode(templateLoadingIndicator.content, true);
	clearContainerHTML(htmlProducts);
	htmlProducts.appendChild(template);
 }
/**
 *Limpiar contenedor
 */
function clearContainerHTML(container){
 	container.innerHTML = "";
}

/**
 *Remover selección de categorías
 */
function removeActiveCategory(){
 	htmlCategories.querySelectorAll('li').forEach(function(userItem) {
	  userItem.classList.remove("active");
	});
}

/**
 *Limpiar search input
 */
function clearSearchInput(){
 	inputSearch.value = "";
}

/**
 *Valida que la tecla que activo el evento sea Enter
 */
function enterValidate(e){
	if(e.keyCode === 13){
		searchProducts(e);
	}
}

function validateText(){
	if(inputSearch.value.length == 0){
		let contentAlert = document.querySelector('#contentAlert');
		contentAlert.innerHTML = "Debe ingresar al menos un caracter";
		return false;
	}
	return true;

}
 









