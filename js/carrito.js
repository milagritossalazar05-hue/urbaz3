// Array para guardar los productos del carrito
let carrito = [];

// Cargar el carrito desde la memoria al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    actualizarCarrito();
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        // Si existe, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, agregarlo como nuevo
        const producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        };
        carrito.push(producto);
    }
    
    // Guardar en memoria y actualizar la vista
    guardarCarrito();
    actualizarCarrito();
    
    // Mostrar notificación visual
    mostrarNotificacion('✅ Producto agregado al carrito');
    
    // Redirigir automáticamente al carrito
    window.location.hash = '#carrito';
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    // Mostrar notificación
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 10);
    
    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>¡Agrega productos para comenzar a comprar!</p>
                <a href="#hombre" class="btn-volver-compras">Ver Productos para Hombre</a>
                <a href="#mujer" class="btn-volver-compras">Ver Productos para Mujer</a>
            </div>
        `;
        totalCarrito.textContent = '0.00';
        return;
    }
    
    // Generar el HTML de los productos
    let html = '';
    let total = 0;
    
    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        
        html += `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-item-info">
                    <h4>${producto.nombre}</h4>
                    <p>Precio unitario: S/. ${producto.precio.toFixed(2)}</p>
                </div>
                <div class="carrito-item-cantidad">
                    <button onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <div class="carrito-item-precio">
                    S/. ${subtotal.toFixed(2)}
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">🗑️</button>
            </div>
        `;
    });
    
    listaCarrito.innerHTML = html;
    totalCarrito.textContent = total.toFixed(2);
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;
    
    // Si la cantidad llega a 0, eliminar el producto
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    guardarCarrito();
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    const productoNombre = carrito[index].nombre;
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion(`🗑️ ${productoNombre} eliminado del carrito`);
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        mostrarNotificacion('🗑️ Carrito vaciado');
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('❌ Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Crear resumen de compra
    let resumenProductos = '\n\nProductos comprados:\n';
    carrito.forEach(item => {
        resumenProductos += `• ${item.nombre} x${item.cantidad} - S/. ${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    alert(`🎉 ¡COMPRA EXITOSA!\n\n` +
          `Total de productos: ${totalItems}\n` +
          resumenProductos +
          `\n💰 TOTAL PAGADO: S/. ${total.toFixed(2)}\n\n` +
          `✅ Tu pedido ha sido procesado.\n` +
          `📦 Recibirás un email de confirmación.\n\n` +
          `¡Gracias por comprar en URBAZ! 🛍️`);
    
    // Vaciar el carrito después de comprar
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
    
    // Mostrar notificación de éxito
    mostrarNotificacion('🎉 ¡Compra realizada con éxito!');
    
    // Redirigir al inicio después de 2 segundos
    setTimeout(() => {
        window.location.hash = '#inicio';
    }, 2000);
}

// Función para guardar el carrito en memoria (usando variables JavaScript)
function guardarCarrito() {
    // En este caso, el carrito se mantiene en la variable mientras la página esté abierta
    // Si quisieras persistencia real entre sesiones, necesitarías usar localStorage
    // pero según las instrucciones, usamos solo memoria durante la sesión
}

// Función para cargar el carrito desde memoria
function cargarCarrito() {
    // El carrito ya está en memoria en la variable 'carrito'
    // Esta función existe por si en el futuro quieres implementar localStorage
}