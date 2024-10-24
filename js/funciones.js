function agregarProducto() {
    const producto = document.getElementById("productoInputAgregar").value;
    
    if (producto === "") {
    document.getElementById("mensajeError").innerHTML = "Por favor, ingrese un producto."
        return;
    }else{
        document.getElementById("mensajeError").innerHTML = ""
    }

    compras.push({ nombre: producto, comprado: false });
    guardarCompras();
    mostrarCompras();
    document.getElementById("productoInputAgregar").value = "";
}

function mostrarCompras() {
  const listaCompras = document.getElementById("listaCompras");
  listaCompras.innerHTML = "";
  if (compras.length === 0) {
      listaCompras.innerHTML = `
          <div class="alert alert-primary" role="alert">
            <h5><br>No hay productos en la lista de compras.</br></h5>
          </div>`;}
      else {
       compras.forEach((item, index) => {
       const li = document.createElement("li");
       li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
       if (item.comprado) {
          li.classList.add("comprado", "bg-success-subtle");
      }else if
      (item.noComprado) {
          li.classList.add("noComprado", "bg-danger-subtle");
      }
      li.innerHTML = `
          ${item.nombre.toUpperCase()}
          <div>
              <button class="btn btn-success btn-sm" onclick="marcarComoComprado(${index})"><i class="bi bi-check-circle"></i></button>
              <button class="btn btn-danger btn-sm" onclick="marcarComoNoComprado(${index})"><i class="bi bi-x-circle"></i></button>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})"><i class="bi bi-trash3"></i></button>
          </div>
      `;
      listaCompras.appendChild(li);
    });
}
}

function marcarComoComprado(index) {
    compras[index].comprado = !compras[index].comprado;
    guardarCompras();
    mostrarCompras();
}

function marcarComoNoComprado(index) {
    compras[index].noComprado = !compras[index].noComprado;
    guardarCompras();
    mostrarCompras();
}


function eliminarProducto(index) {
    compras.splice(index, 1);
    guardarCompras();
    mostrarCompras();
}

function guardarCompras() {
    localStorage.setItem('compras', JSON.stringify(compras));
}

function guardarLista() {
 if (compras.length === 0) {
     Swal.fire({
         title: "La lista de compras esta vacia!",
         icon: "error",
         iconColor: "#d33",
         timer: 2000,
       });
     return;
   }
if (listasGuardadas.length >= 3) {
    Swal.fire({
        title: "Límite de listas alcanzado!",
        text: "Has alcanzado el máximo de 3 listas guardadas. Elimina una lista si deseas guardar otra.",
        icon: "warning",
        iconColor: "#d33",
        confirmButtonColor: "#198754",
    });
    return;
}

const listaCopia = JSON.parse(JSON.stringify(compras));
listasGuardadas.push(listaCopia);
    
localStorage.setItem('listasGuardadas', JSON.stringify(listasGuardadas));
mostrarListasGuardadas();
Swal.fire({
    title: "La lista de compras guardada correctamente!",
    icon: "success",
    timer: 2000,
  });
}

function eliminarLista() {
  Swal.fire({
      text: "Estas seguro que queres eliminar la lista de compras?",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: " #198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
          compras = [];
    guardarCompras();
    mostrarCompras();

          Swal.fire({
            title: "Eliminada",
            text: "La lista de compras fue eliminada con exito!",
            icon: "success",
            timer: 3000,
          });
        }
      });
}

function mostrarListasGuardadas() {
   const divListas = document.getElementById("listasGuardadas");
   divListas.innerHTML = ""; 
   if (listasGuardadas.length === 0) {
       divListas.innerHTML = `<div class="alert alert-primary p-1 w-100 text-center" role="alert">
                 <h5><br>No hay listas guardadas.</br></h5>
            </div>`; 
   }else{listasGuardadas.forEach((lista, index) => {
       const div = document.createElement("div");
       div.classList.add("mt-2");
       let textoLista = "";
       lista.forEach(item => {
           textoLista += `${item.nombre}<br>`;
       });
       div.innerHTML = `
           <div class="card w-100">
               <div class="card-body p-3">
                   <h5 class="card-title">Lista Guardada ${index + 1}</h5>
                   <button class="btn btn-primary p-1" onclick="verLista(${index})">Ver</button>
                   <button class="btn btn-success p-1" onclick="restaurarLista(${index})">Restaurar</button>
                   <button class="btn btn-danger p-1" onclick="eliminarListaGuardada(${index})">Eliminar</button>
               </div>
           </div>
       `;
       divListas.appendChild(div);
   });
}
}

function verLista(index) {
    const listaSeleccionada = listasGuardadas[index];
    let listaHTML = "<ul class='list-group'>";
    listaSeleccionada.forEach(item => {
        listaHTML += `<li class="list-group-item text-start">${item.nombre}</li>`;
    });
    listaHTML += "</ul>";

    Swal.fire({
        title: `Lista Guardada ${index + 1}`,
        html: listaHTML,
        width: "400px",
        showCloseButton: true,
        confirmButtonText: 'Cerrar',
    });
}

function restaurarLista(index) {
    compras = JSON.parse(JSON.stringify(listasGuardadas[index]));
    guardarCompras();
    mostrarCompras();
    Swal.fire({
        title: `La lista de compras ${index +1} restaurada correctamente!`,
        icon: "success",
        timer: 2000,
      });
    }
  
function eliminarListaGuardada(index) {
  Swal.fire({
      text: `Estas seguro que queres eliminar la lista de compras guardada ${index +1}?`,
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: " #198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
if (result.isConfirmed) {    
    listasGuardadas.splice(index, 1);
    localStorage.setItem('listasGuardadas', JSON.stringify(listasGuardadas));
    mostrarListasGuardadas();
    Swal.fire({
        title: "Eliminada",
        text: `La lista de compras guardada ${index +1} fue eliminada con exito!`,
        icon: "success",
        timer: 3000,
      });
    }
  });
}
async function obtenerProductos() {
    try {
        const response = await fetch('./datos.json'); 
        productos = await response.json();
        mostrarProductos();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

function mostrarProductos(filtrados = productos) {
    const contenedor = document.getElementById('productosContainer');
    contenedor.innerHTML = '';

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<div class="alert alert-danger h-25 text-danger text-center col-8 p-1 ms-4"><h5><br>No se encontró el producto.</br></h5></div>`;
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = filtrados.slice(inicio, fin); 

    productosPagina.forEach(producto => {
        const card = `
            <div class="col-6 mb-4">
                <div class="card d-flex flex-row align-items-center p-2 bg-primary-subtle">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="width: 80px; height: 80px;">
                    <div class="card-body d-flex justify-content-around p-1 align-items-center">
                        <div class="d-flex flex-column">
                            <h4 class="card-title text-center">${producto.nombre}</h4>
                            <span>${producto.descripcion}</span>
                        </div>
                        <button class="btn btn-danger p-1 h-50" onclick="agregarProductoDesdeApi('${producto.nombre}')">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += card;
    });

    actualizarBotones(filtrados.length); 
}

function actualizarBotones(totalProductos) {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');

    btnAnterior.disabled = (paginaActual === 1);
    btnSiguiente.disabled = (paginaActual * productosPorPagina >= totalProductos);
}

function cambiarPagina(direccion, filtrados = productos) {
    if (direccion === 'adelante' && (paginaActual * productosPorPagina < filtrados.length)) {
        paginaActual++;
    } else if (direccion === 'atras' && paginaActual > 1) {
        paginaActual--;
    }
    mostrarProductos(filtrados); 
}

function buscarProductos() {
    const inputBusqueda = document.getElementById('productoInput').value.toLowerCase();
    
    if (inputBusqueda === "") {
        mostrarProductos(); 
        return;
    }
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(inputBusqueda)
    );
    
    paginaActual = 1; 
    mostrarProductos(productosFiltrados);
}
function agregarProductoDesdeApi(nombreProducto) {
    compras.push({ nombre: nombreProducto, comprado: false });
    guardarCompras();  
    mostrarCompras();  
    Swal.fire({
        title: `${nombreProducto} agregado a la lista de compras!`,
        icon: "success",
        timer: 2000,
    });
}