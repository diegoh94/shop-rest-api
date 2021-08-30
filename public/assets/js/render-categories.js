/**
 * Función que se encarga de habilitar el template para luego enviarlo
 * como parámetro para insertar los valores correspondientes 
 * y finalmente renderizarlo en el navegador.
 */
function renderCategory(category) {		
	let template = document.importNode(templateCategory.content, true);

	renderCategoryName(template, category);

	htmlCategories.appendChild(template);
}

/**
 * Función que añade el Nombre y id de las categoría al template.
 */
function renderCategoryName(template, category){
	template.querySelector('li').innerHTML = category.name;
	template.querySelector('li').value = category.id;
	template.querySelector('li').dataset.name = category.name;
}