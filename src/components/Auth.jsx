// ---------------------------------------------------------
// Componente: Auth.js
// Descripción:
// Maneja todo el sistema de autenticación con Firebase Auth.
// Incluye:
// - Formulario controlado con estado
// - Inicio de sesión con email y contraseña
// - Cierre de sesión
// - Renderizado condicional según si el usuario está autenticado
// - Manejo de errores
// ---------------------------------------------------------

import React, { Component } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

class Auth extends Component {

  // -------------------------------------------------------
  // Estado inicial del componente:
  // email: input del usuario
  // password: contraseña ingresada
  // usuario: objeto devuelto por Firebase si el login es exitoso
  // error: mensaje de error si falla el inicio de sesión
  // -------------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      usuario: null,
      error: ''
    };
  }

  // -------------------------------------------------------
  // manejarCambio:
  // Se ejecuta cada vez que el usuario escribe en un input.
  // Actualiza dinámicamente el valor en el estado.
  // -------------------------------------------------------
  manejarCambio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // -------------------------------------------------------
  // loginUsuario:
  // Inicia sesión utilizando Firebase Auth.
  // Si es exitoso → guarda el usuario en el estado.
  // Si falla → muestra un mensaje de error.
  // -------------------------------------------------------
  loginUsuario = async () => {
    const { email, password } = this.state;
    try {
      const usuarioCred = await signInWithEmailAndPassword(auth, email, password);
      this.setState({ usuario: usuarioCred.user, error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // -------------------------------------------------------
  // cerrarSesion:
  // Cierra la sesión en Firebase y reinicia el estado del componente.
  // -------------------------------------------------------
  cerrarSesion = async () => {
    try {
      await signOut(auth);
      this.setState({ usuario: null, email: '', password: '', error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // -------------------------------------------------------
  // render:
  // Muestra dos vistas:
  // 1. Si NO hay usuario → formulario de login
  // 2. Si hay usuario → mensaje de bienvenida + botón de "cerrar sesión"
  // -------------------------------------------------------
  render() {
    const { email, password, usuario, error } = this.state;

    return (
      <div className="auth-container d-flex flex-column align-items-center my-3 p-4 border rounded shadow-sm bg-light w-100">

        {/* Muestra errores si existen */}
        {error && <p className="text-danger">{error}</p>}

        {/* Si el usuario NO está autenticado, mostramos el formulario */}
        {!usuario ? (
          <form className="w-100" style={{ maxWidth: "350px" }}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                autoComplete="off"
                value={email}
                onChange={this.manejarCambio}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                value={password}
                onChange={this.manejarCambio}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={this.loginUsuario}
            >
              Iniciar Sesión
            </button>
          </form>
        ) : (

          // Si el usuario sí está autenticado, se muestra esta vista
          <div className="text-center">
            <p className="mb-3">
              ¡Bienvenido, <strong>{usuario.email}</strong>!
            </p>

            <button
              className="btn btn-danger w-100"
              onClick={this.cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Auth;
