
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // Pulsamos en Agregar para añadir curso al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito completamente
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })

}


// Funciones \\

// Agregamos curso al carrito
function agregarCurso(e) {
    e.preventDefault(); // Lo hacemos para mantener fija la pagina al darle click a añadir carrito
    
    
    if ( e.target.classList.contains('agregar-carrito') ) { //Nos aseguramos que se ha hecho clcik en "Agregar Carrito" 
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if ( e.target.classList.contains('borrar-curso') ) {
        const cursoID = e.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID)
        
        carritoHTML();
    }
}

// Lee el contenido del HTML que le dimos click
function leerDatosCurso(curso) {

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un articulo ya esta en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos]
    } else {
        // Agregamos elementos al array de articulosCarrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    carritoHTML()
}

// Muestra el carrito de compra en el HTML
function carritoHTML() {

    //Primero limpiamos el HTML del carrito
    limpiarHTML()

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src= "${curso.imagen}" width="100"> </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
            <a href ="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `
        //Agrega HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los curso del tbody
function limpiarHTML(){
    // contenedorCarrito.innerHTML = ''
    //Vamos a optimizar la limpieza del HTML con un while.
    // Revisamos el carrito, miramos el primer hijo, si lo tiene, lo elimina, pasa al segundo, etc...
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

