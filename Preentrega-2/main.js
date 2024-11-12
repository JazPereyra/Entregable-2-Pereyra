const productos = [ 
    {
        id:"05",
        titulo: "Bolso ",
        imagen: "./img/Bolso-05.jpg",
        precio: 3990
    },
    {
        id:"06",
        titulo: "Bolso",
        imagen: "./img/Bolso-06.jpg",
        precio: 5600
    },
    {
        id:"01",
        titulo: "Cartuchera",
        imagen: "./img/Cartuchera-01.jpg",
        precio: 6000
    },
    {
        id:"03",
        titulo: "Set Matero",
        imagen: "./img/Set-Matero-03.jpg",
        precio: 7500
    }
];


const contenedorProductos = document.querySelector("#contenedorProductos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos() {
    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
        <button class="producto-agregar" id="${producto.id}">Agregar</button>
        `;

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar);

}

cargarProductos();

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

let productosEnCarrito; 


const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"))
if(productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito()
} else { 
    productosEnCarrito = [];


}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado) 
    }

    actualizarNumerito()
    
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))

};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos2 = document.querySelector("#carrito-productos");
const carritoComprado = document.querySelector("#carrito-comprado");
const carritoAccion = document.querySelector("#carrito-accion");

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

if (productosEnCarrito) {
    carritoVacio.classList.add("disabled");
    contenedorProductos2.classList.remove("disabled");
    carritoAccion.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    contenedorProductos2.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="carrito-producto-img" src="${producto.imagen}" alt="">
            <div class="carrito-producto-titulo">
                <h2 class="carrito-producto-titulo">${producto.titulo}</h2>
            </div>
            <div class="carrito-producto-cantidad">
                <Small>Cantidad:</Small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio:</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal:</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
        `;

        contenedorProductos2.append(div);
    
    })
}   




    

