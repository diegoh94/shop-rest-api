##  SHOP API REST

Este proyecto ha sido realizado como solución a un ejercicio propuesto para postular a un puesto de backend developer.

El proyecto en cuestión es una API REST que responde solicitudes de una [app cliente](https://github.com/diegoh94/shop-client).

La aplicación cliente debe:
- Desplegar todos los productos en el primer renderizado.
- Servir dinamicamente productos por categoría.
- Implementar un buscador de productos.

Para ello se ha implementado la solución de la siguiente manera:

## Lógica

La API puede ser llamada de la siguiente manera dependiendo de lo que se necesite

### Para devolver todos los productos
/api/products 

### Para devolver los productos filtrados por categorías
/api/products?category_id=5 

### Para devolver los productos filtrados por caracter
/api/products?character=redbull

Tales rutas se han definido en **shop-rest-api/routes/api.php**

Y son resueltas por los métodos definidos en los controladores **ProductController** y **CategoryController**. 
Donde cada método recibe los parámetros GET y devuelve un json con la data filtrada. 

