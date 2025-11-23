import React, { Component } from 'react';
import ProductoItem from './ProductoItem';

class ListaProductos extends Component {
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

  agregarAlCarrito = (producto) => {
    this.setState({
      carrito: [...this.state.carrito, producto]
    });
  };

  borrarDelCarrito = (index) => {
    const nuevoCarrito = [...this.state.carrito];
    nuevoCarrito.splice(index, 1);
    this.setState({ carrito: nuevoCarrito });
  };

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
              callback={this.agregarAlCarrito}
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
