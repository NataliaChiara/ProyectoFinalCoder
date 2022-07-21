class Carrito {
    constructor(productos) {
        this.productos = productos;
    }

    calcularTotal() {
        let suma = 0
        carrito.productos.forEach(element => {
            suma = suma + (Number(element.precio))
        })
        return suma
    }
}


const productos = []
let carrito = new Carrito([]);

obtenerDatos()
obtenerStorage()

function obtenerStorage() {
    const storage = (JSON.parse(localStorage.getItem("carrito")))
    if (!storage) {
    }
    else {
        carrito.productos.push(...storage)
    }
}


function obtenerDatos() {
    fetch('./js/data.json')
        .then((res) => res.json())
        .then((json) => sumarProductosArray(json))
        .catch((error) => alert("No puedo mostrar info. Intente mas tarde " + error))
}

function sumarProductosArray(producto) {

    productos.push(...producto)
    mostrarProductos()

}

function mostrarProductos() {
    const main = document.getElementById("main")
    main.innerHTML = ""
    const carritoNodo = document.getElementById("conteinerCarrito");
    carritoNodo.innerHTML = ""
    const containerProd = document.createElement("div")
    containerProd.classList.add("containerProd")
    productos.forEach(element => {
        const product = document.createElement("div")
        product.classList.add("producto")
        product.innerHTML = `
                            <div class="cat">
                                <img class="img"
                                src="${element.imagen}">
                            </div>
                        
                            <div class="descripcion">
                                <h1>${element.nombre}</h1>
                                <h2>$${element.precio}</h2>
                            </div>
   
                            <button class="suma" onclick="aggProduct('${element.id}')">Sumar al carrito</button>

                            `
        containerProd.appendChild(product)
    })

    main.appendChild(containerProd)
}

function aggProduct(idProducto) {

    Swal.fire({
        title: ``,
        text: 'Producto agregado!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    })

    const producto = productos.find(element => element.id == idProducto);
    carrito.productos.push(producto);
    carrito.calcularTotal()
    localStorage.setItem("carrito", JSON.stringify(carrito.productos))
}

function mostrarPantallaCarrito() {
    const main = document.getElementById("main")
    main.innerHTML = ""
    main.innerHTML = `
    <h3 class="totalCarrito">Total: ${carrito.calcularTotal()}</h3>
    <div class="navCarrito">
        <button class="suma" onclick="finalizarCompra()">Finalizar Compra</button>
        <button class="suma" onclick="mostrarProductos()">volver</button>
        <button class="suma" onclick="eliminarCarrito()">Eliminar</button>
    </div>`

    mostrarCarrito()

}


function mostrarCarrito() {

    const carritoNodo = document.getElementById("conteinerCarrito");
    carritoNodo.innerHTML = ""

    carrito.productos.forEach(element => {
        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = ` 

         <div class="cat">
            <img class="img" src="${element.imagen}">
            </div>

            <div class="descripcion">
                <h1>${element.nombre}</h1>
                <h2>$${element.precio}</h2>
            </div>

    `
        carritoNodo.appendChild(div);
    })


}


function finalizarCompra() {
    Swal.fire({
        title: ``,
        text: 'Compra realizada!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    })
}

function eliminarCarrito(){
    Swal.fire({
        title: ``,
        text: 'Carrito eliminado',
        icon: 'error',
        confirmButtonText: 'Aceptar',
    })
    carrito.productos.length=0
    localStorage.setItem("carrito", JSON.stringify(carrito.productos))
    mostrarPantallaCarrito()
}

// INTERACCION

const botonCarrito = document.getElementById("carrito")
botonCarrito.addEventListener("click", () => {
    mostrarPantallaCarrito()
})
