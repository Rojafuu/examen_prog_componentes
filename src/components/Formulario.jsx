// ---------------------------------------------------------
// Componente: Formulario.js
// Descripción general:
// Este componente implementa un formulario controlado usando
// componentes de clase. Incluye validaciones con la librería
// react-simple-validator y guarda los datos en Firebase Firestore.
// ---------------------------------------------------------

import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

class Formulario extends Component {

  // -------------------------------------------------------
  // Constructor:
  // Se define el estado inicial del formulario (nombre, email, mensaje)
  // y se configura el validador con mensajes personalizados.
  // -------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      email: '',
      mensaje: ''
    };

    // Configuración del validador con mensajes personalizados
    this.validator = new SimpleReactValidator({
      messages: {
        required: 'Este campo es obligatorio',
        email: 'Ingrese un email válido'
      }
    });
  }

  // -------------------------------------------------------
  // manejarCambio:
  // Cada vez que el usuario escribe en un input, este método
  // actualiza el estado correspondiente.
  // -------------------------------------------------------
  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // -------------------------------------------------------
  // manejarEnvio:
  // Se ejecuta cuando se envía el formulario.
  // Pasos:
  // 1. Evita recargar la página (preventDefault)
  // 2. Valida los campos
  // 3. Si todo está correcto:
  //    - Guarda los datos en Firestore (colección "formulario")
  //    - Muestra mensaje de éxito
  //    - Limpia el formulario
  // 4. Si hay errores → los muestra en pantalla
  // -------------------------------------------------------
  manejarEnvio = async (e) => {
    e.preventDefault();

    if (this.validator.allValid()) {
      try {
        await addDoc(collection(db, "formulario"), this.state);

        alert("Datos guardados correctamente!");

        // Limpieza del formulario una vez enviado
        this.setState({ nombre: "", email: "", mensaje: "" });
        this.validator.hideMessages();
        this.forceUpdate();
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Ocurrió un error al guardar los datos.");
      }
    } else {
      // Si hay errores, se muestran en pantalla
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  // -------------------------------------------------------
  // render:
  // Devuelve el formulario con los tres campos solicitados.
  // Cada input es controlado (usa this.state) y muestra los
  // mensajes de error cuando el validador lo indique.
  // -------------------------------------------------------
  render() {
    return (
      <form onSubmit={this.manejarEnvio} className="w-75 mx-auto">
        
        {/* Campo Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={this.state.nombre}
            onChange={this.manejarCambio}
          />
          {this.validator.message('nombre', this.state.nombre, 'required')}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.manejarCambio}
          />
          {this.validator.message('email', this.state.email, 'required|email')}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label className="form-label">Mensaje:</label>
          <textarea
            name="mensaje"
            className="form-control"
            value={this.state.mensaje}
            onChange={this.manejarCambio}
          />
          {this.validator.message('mensaje', this.state.mensaje, 'required')}
        </div>

        {/* Botón enviar */}
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    );
  }
}

export default Formulario;
