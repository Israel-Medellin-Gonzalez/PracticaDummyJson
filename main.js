const cargarProductos =()=>{
    //obtener todos los productos
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => mostrarProductos(data.products));
}

// Funcion para mostrar los productos en el HTML
const mostrarProductos = (productos) => {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    //Recorrido del arreglo de los productos
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('productos-card');
        tarjeta.setAttribute('data-id', producto.id);
        tarjeta.setAttribute('tabindex', '0');
        //Creación de las tarjetas de los productos
        tarjeta.innerHTML = `
            <h3>${producto.title}</h3>
            <img src="${producto.thumbnail}" alt="${producto.title}">
            <p>Precio: $${producto.price}</p>
            <p>Categoría: ${producto.category}</p>
            <p>Rating: ${producto.rating}</p>
        `;

        //Evento para ir a la pagina de detalle del producto
        tarjeta.addEventListener('click', () => {
            window.location.href = `pagproduc.html?id=${producto.id}`;
        });
        contenedor.appendChild(tarjeta);
    });
    if (productos.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    }
}

//Funcion para buscar algun producto
const buscarProducto = (nombreP) => {
    fetch(`https://dummyjson.com/products/search?q=${nombreP}`)
    .then(res => res.json())
    .then(data => mostrarProductos(data.products));
}
    
//Evento para cargar los productos al iniciar la pagina
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        //Carga el detalle del producto
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(prod => {
                document.getElementById('prod-title').textContent = prod.title;
                const imgEl = document.getElementById('prod-image');
                imgEl.src = prod.images[0];
                imgEl.alt = prod.title;
                imgEl.style.objectFit = 'cover';
                document.getElementById('prod-price').textContent = `Precio: $${prod.price}`;
                document.getElementById('prod-category').textContent = `Categoría: ${prod.category}`;
                document.getElementById('prod-rating').textContent = `Rating: ${prod.rating}`;
                document.getElementById('prod-description').textContent = prod.description;
            });
        return;
    }

    //llamada hacia la funcion cargarProductos
    cargarProductos();

    //Declaración de los elementos del formulario de búsqueda
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    //Logica para la búsqueda
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (q) {
                buscarProducto(q);
            } else {
                cargarProductos();
            }
        });
    }
});