/**
 * Función que se encarga de habilitar el template para luego enviarlo
 * como parámetro para insertar los valores correspondientes 
 * y finalmente renderizarlo en el navegador.
 */
function renderProduct(product) {	
	let elementTemplate = document.querySelector("#templateProduct");
	let template = document.importNode(elementTemplate.content, true);
	
	renderProductImage(template, product);
	renderProductTitle(template, product.name);
	renderProductPrice(template, product.price);
	renderProductDiscount(template, product.discount);

	htmlProducts.appendChild(template);
}

/**
 * Función que añade los atributos de imagen al template.
 */
function renderProductImage(template, product){
	template.querySelector('img.card-img-top').src = getImageUrl(product.url_image);
	template.querySelector('img.card-img-top').alt = product.name;
	template.querySelector('img.card-img-top').title = product.name;
}

/**
 * Función que añade el nombre del producto al template.
 */
function renderProductTitle(template, name){
	template.querySelector('h3.card-title').innerHTML = name;
}

/**
 * Función que añade el precio del producto al template.
 */
function renderProductPrice(template, price){
	template.querySelector('span.price').innerHTML = getFormattedPrice(price);
}

/**
 * Función que añade el descuento del producto al template.
 */
function renderProductDiscount(template, discount){
	if(discount > '0'){
		template.querySelector('div.discount').innerHTML = getFormattedDiscount(discount);
	}else{	
		template.querySelector('div.discount').className = "d-none"
	}
}
/**
 * Esta función recibe un producto y devuelve la URL de su imagen.
 * El valor es el mismo a menos que no tenga, y se use una imagen por defecto.
 */
function getImageUrl(url_image) {
	if (url_image) {
		return url_image;
	}
	return 'assets/images/no_image.png';
}

/**
 * Esta función recibe un precio como flotante (ej. 34.5456456)
 * y devuelve una cadena lista para mostrar al usuario final (ej. $ 34.54)
 */
function getFormattedPrice(price) {	
	const formatCurrency = new Intl.NumberFormat('es-PE', {
		style: 'currency',
	    currency: 'PEN',
	    minimumFractionDigits: 2
	});
	return formatCurrency.format(price);
}

/**
 * Función que añade el precio del producto al template.
 */
function getFormattedDiscount(discount) {	
	return discount+'%';
}

