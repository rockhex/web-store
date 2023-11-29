const cartDropdown = document.querySelector(".products-container");
const unidadesElemento = document.querySelector(".total-unidades");
const precioElemento = document.querySelector(".total-precio");
const mensajeCarrito = document.querySelector(".mensaje-carrito-vacio");
const infoCarrito = document.querySelector(".products-info-container");
const tituloCarrito = document.querySelector(".titulo-carrito-pagina");


// CREA LOS PRODUCTOS SELECCIONADOS EN EL CARRITO
function crearProductosMenu() {
  cartDropdown.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("relojes"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList = "card-shop";
      nuevoProducto.innerHTML = `
                  <article>
                      <figure>
                      <img src=${producto.img} alt="producto_1">
                      </figure>
                      <p>RELOJ MODELO ${producto.nombre}</p>
                      <p>PRECIO $${producto.precio}</p>
                      <div class='count-info-shop-menu'>
                        <div>
                            <p>Cantidad</p>
                          <button class='restar-cantidad'>-</button>
                          <span class='cantidad'>${producto.cantidad}</span>
                          <button class='sumar-cantidad'>+</button>
                        </div>  
                      </div>
                  <article/>
  
          `;
      cartDropdown.appendChild(nuevoProducto);

      nuevoProducto
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement =
            e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales()
        });
      nuevoProducto
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          restarAlCarrito(producto);
          revisarMensaje()
          crearProductosMenu();
          actualizarTotales()
        });
    });
  }
}

crearProductosMenu();
actualizarTotales()

function actualizarTotales() {
  // Obtén los productos del almacenamiento local
  const productos = JSON.parse(localStorage.getItem("relojes")) || [];

  // Inicializa las variables de totales
  let unidades = 0;
  let precioTotal = 0;

  // Calcula los totales
  productos.forEach(producto => {
      unidades += producto.cantidad || 0; 
      precioTotal += (producto.precio || 0) * (producto.cantidad || 0); 
  });

  // Actualiza los elementos en el DOM
  const unidadesElemento = document.getElementById("total-unidades");
  const precioElemento = document.getElementById("total-precio");

  if (unidadesElemento) {
      unidadesElemento.innerText = `Total de unidades: ${unidades}`;
  }

  if (precioElemento) {
      // Agrega el símbolo de dólar al valor total
      const precioFormateado = `$${precioTotal.toFixed(2)}`;
      precioElemento.innerText = `Valor total: ${precioFormateado}`;
  }
}
actualizarTotales();


function revisarMensaje(){
    const productos = JSON.parse(localStorage.getItem("relojes"));
    mensajeCarrito.classList.toggle("escondido", productos && productos.length> 0)
    infoCarrito.classList.toggle("escondido", !(productos && productos.length >0))

    if (productos && productos.length > 0) {
        tituloCarrito.innerText = "TU CARRITO";
    } else {
        tituloCarrito.innerText = "EL CARRITO ESTÁ VACÍO";
    }
}

revisarMensaje()



function mostrarMensaje() {
  alert("¡Felicidades por su compra!");
}

const comprarBtn = document.getElementById("comprarBtn");




function limpiarCarrito() {
  localStorage.removeItem("relojes");

  
  crearProductosMenu();
  actualizarTotales();
  revisarMensaje();

  
  console.log("Limpiando carrito");

 
  const unidadesElemento = document.getElementById("count-carrito");
  if (unidadesElemento) {
    unidadesElemento.innerText = "0";
  }
}

comprarBtn.addEventListener("click", () => {
  mostrarMensaje();
  limpiarCarrito();
});






