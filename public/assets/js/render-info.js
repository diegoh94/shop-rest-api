/*
 *Inserta información adicional de los productos cargados, por categoría o búsqueda.
 */
function renderAdditionalInfo(textInfo, infoType){
 	clearSearchInput();
	let template = document.importNode(templateAdditionalInfo.content, true);
	clearContainerHTML(htmlSearchInfo);
 	
 	if(infoType == 'category'){
 		if(textInfo){
			template.querySelector('p').innerHTML = "Categoría: "+textInfo;				
 		}else{ 			
			template.querySelector('p').innerHTML = "Todos los productos";				
 		}
 	}
 	if(infoType == 'search'){
		template.querySelector('span').innerHTML = textInfo;			
	}

	htmlSearchInfo.appendChild(template);
}
/*
 *Inserta cantidad de productos como información adicional.
 */
function renderProductsQuantity(length){
	let templateQuantity = document.importNode(templateProductQuantity.content, true);
	templateQuantity.querySelector('span').innerHTML = getQuantityText(length);
	quantityProduts.appendChild(templateQuantity);
}

/*
 *Devuelve cantidad de productos con texto adicional
 */
function getQuantityText(length){
	return 'Cantidad de productos: '+length;	
}