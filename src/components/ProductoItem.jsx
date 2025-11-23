// ---------------------------------------------------------
// Componente: ProductoItem.js
// Descripción general:
// Este componente funciona como "hijo" dentro del ejercicio 1.
// Recibe un producto desde el componente padre (ListaProductos)
// mediante props, y también recibe un callback para notificar
// cuando el usuario desea agregar ese producto al carrito.
//
// Este archivo demuestra:
//  - Uso de props en componentes de clase
//  - Renderizado dinámico de información
//  - Comunicación hijo → padre utilizando callbacks
// ---------------------------------------------------------

import React, { Component } from 'react';

class ProductoItem extends Component {

  // -------------------------------------------------------
  // agregarAlCarrito:
  // Método que se ejecuta cuando el usuario hace clic en el botón.
  // Llama al callback que viene desde el padre (ListaProductos)
  // y le envía como argumento el producto actual.
  //
  // Esto permite que el componente hijo "avise" al padre qué acción hacer.
  // -------------------------------------------------------
  agregarAlCarrito = () => {
    this.props.callback(this.props.producto);
  }

  // -------------------------------------------------------
  // render:
  // Muestra la información del producto usando destructuración
  // de las props: nombre y precio.
  // Incluye un botón que ejecuta la función agregarAlCarrito.
  // -------------------------------------------------------
  render() {
    const { nombre, precio } = this.props.producto;

    return (
      <div className="card" style={{ marginBottom: '10px', padding: '10px' }}>
        
        {/* Nombre del producto */}
        <h3>{nombre}</h3>

        {/* Precio del producto */}
        <p>Precio: ${precio}</p>

        {/* Botón para agregar este producto al carrito */}
        <button 
          className="btn btn-primary"
          onClick={this.agregarAlCarrito}
        >
          Agregar al carrito
        </button>

      </div>
    );
  }
}

export default ProductoItem;
