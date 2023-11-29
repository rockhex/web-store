const botonCantidadProductos = document.querySelector("#count-carrito");

function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("relojes"));
  let cuenta = 0
  console.log(memoria);
  if (!memoria) {
    const nuevoProducto = nuevoProductoParaMemoria(producto);
    localStorage.setItem("relojes", JSON.stringify([nuevoProducto]));
    cuenta = 1
  } else {
    const indiceProducto = memoria.findIndex(
      (reloj) => reloj.id === producto.id
    );
    console.log(indiceProducto);
    const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
      nuevaMemoria.push(nuevoProductoParaMemoria(producto));
      cuenta = 1
    } else {
      nuevaMemoria[indiceProducto].cantidad++;
      cuenta = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("relojes", JSON.stringify(nuevaMemoria));
  }
  actualizarNumeroCarrito();
  return cuenta
}

function restarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("relojes"));
  const indiceProducto = memoria.findIndex((reloj) => reloj.id === producto.id);
  if (memoria[indiceProducto].cantidad == 1) {
    memoria.splice(indiceProducto, 1);
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("relojes", JSON.stringify(memoria));
  actualizarNumeroCarrito();
}

function nuevoProductoParaMemoria(producto) {
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem("relojes"));
  const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
  return botonCantidadProductos.innerText = cuenta;
}

actualizarNumeroCarrito();

