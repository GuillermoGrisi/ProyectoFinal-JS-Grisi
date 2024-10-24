let compras = JSON.parse(localStorage.getItem('compras')) || [];
let listasGuardadas = JSON.parse(localStorage.getItem('listasGuardadas')) || [];

let productos = []; 
let paginaActual = 1;
const productosPorPagina = 10;

document.addEventListener("DOMContentLoaded", () => {
        mostrarCompras();
        mostrarListasGuardadas();
    });


document.getElementById("agregarBtn").addEventListener("click", agregarProducto);
document.getElementById("guardarListaBtn").addEventListener("click", guardarLista);
document.getElementById("eliminarListaBtn").addEventListener("click", eliminarLista);


document.getElementById("productoInputAgregar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { agregarProducto();}});

document.getElementById('productoInput').addEventListener("input", buscarProductos);


document.addEventListener('DOMContentLoaded', obtenerProductos);