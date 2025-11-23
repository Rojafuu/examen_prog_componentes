import React, { Component } from 'react';

class ProductoItem extends Component {

  agregarAlCarrito = () => {
    this.props.callback(this.props.producto);
  }

  render() {
    const { nombre, precio } = this.props.producto;

    return (
      <div className="card" style={{ marginBottom: '10px', padding: '10px' }}>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>

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
