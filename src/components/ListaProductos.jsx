// ---------------------------------------------------------
// Componente: ListaProductos.js
// Descripción general:
// Este componente funciona como "padre" del ejercicio 1.
// Aquí se maneja:
//  - La lista de productos (estado inicial)
//  - El carrito de compras
//  - La comunicación con el componente hijo ProductoItem
//  - La lógica para agregar y eliminar productos del carrito
//
// Este componente demuestra manejo de estado, renderizado dinámico
// y comunicación padre → hijo e hijo → padre mediante props y callbacks.
// ---------------------------------------------------------

import React, { Component } from 'react';
import ProductoItem from './ProductoItem';

class ListaProductos extends Component {

  // -------------------------------------------------------
  // Constructor:
  // Define el estado inicial con dos elementos:
  // 1. productos: lista fija de productos a mostrar
  // 2. carrito: inicialmente vacío, se irá llenando con las selecciones
  // -------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        { id: 1, nombre: 'Pastel de Choclo', precio: 12000 },
        { id: 2, nombre: 'Costillar Ahumado', precio: 25000 },
        { id: 3, nombre: 'Cena a la Chilena', precio: 38000 }
      ],
      carrito: []
    };
  }

  // -------------------------------------------------------
  // agregarAlCarrito:
  // Esta función se envía como callback al componente hijo.
  // Cuando el usuario hace clic en "Agregar" en ProductoItem,
  // el hijo ejecuta esta función y le pasa el producto seleccionado.
  //
  // El estado del carrito se actualiza agregando el nuevo producto.
  // -------------------------------------------------------
  agregarAlCarrito = (producto) => {
    this.setState({
      carrito: [...this.state.carrito, producto]
    });
  };

  // -------------------------------------------------------
  // borrarDelCarrito:
  // Permite eliminar un producto según su índice.
  // Se crea una copia del carrito, se elimina el elemento y se actualiza el estado.
  //
  // Esto demuestra manipulación de arrays y actualización de estado con setState.
  // -------------------------------------------------------
  borrarDelCarrito = (index) => {
    const nuevoCarrito = [...this.state.carrito];
    nuevoCarrito.splice(index, 1);
    this.setState({ carrito: nuevoCarrito });
  };

  // -------------------------------------------------------
  // render:
  // 1. Muestra el título
  // 2. Renderiza dinámicamente la lista de productos usando .map
  //    Cada producto se envía como prop al componente hijo ProductoItem
  // 3. Muestra el carrito con los elementos agregados
  // -------------------------------------------------------
  render() {
    return (
      <div className="container mt-4">

        <h2 className="mb-4">Comida Chilena</h2>

        {/* LISTA DE PRODUCTOS */}
        <div className="d-flex flex-column align-items-center gap-3 mb-4">
          {this.state.productos.map((prod) => (
            <ProductoItem
              key={prod.id}
              producto={prod}
              callback={this.agregarAlCarrito} // Comunicación hijo → padre
            />
          ))}
        </div>

        {/* CARRITO */}
        <h3>Carrito:</h3>
        <ul className="list-group w-75 mx-auto">
          {this.state.carrito.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.nombre} – ${item.precio}

              {/* Botón para eliminar items del carrito */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.borrarDelCarrito(index)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListaProductos;
