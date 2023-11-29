const contenedorTarjetas = document.querySelector('.cards-container')


// CREAR ARTICULOS POR PRODUCTO
function crearProductosIndex(productos) {
    productos.forEach(producto =>{
        const nuevoProducto = document.createElement('article')
        nuevoProducto.classList = 'card'
        nuevoProducto.innerHTML = `
            <figure>
                <img src=${producto.img} alt="producto_1">
            </figure>
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
            <button class='agregar-carrito'>Agregar al Carrito</button>
        `
        contenedorTarjetas.appendChild(nuevoProducto)

        nuevoProducto.getElementsByTagName('button')[0].addEventListener('click', ()=> agregarAlCarrito(producto))
    })
}

crearProductosIndex(productos);