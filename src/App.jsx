import React from 'react';
import ListaProductos from './components/ListaProductos';
import Formulario from './components/Formulario';
import Auth from './components/Auth';
import Storage from './components/Storage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ---------------------------------------------------------
   Componente principal de la aplicación (App.js)
   ---------------------------------------------------------
   Este archivo sirve como punto central donde se muestran 
   los tres ejercicios solicitados en la evaluación.

   • Ejercicio 1 → Lista de productos y carrito (componentes de clase,
     props, estado y callbacks).

   • Ejercicio 2 → Formulario con validación mediante
     "simple-react-validator" y guardado en Firebase Firestore.

   • Ejercicio 3 → Autenticación con Firebase Auth y subida de archivos
     con Firebase Storage, ambos implementados usando componentes de clase.

   Cada sección está claramente separada para facilitar la lectura,
   revisión y demostración de los distintos requerimientos del examen.
--------------------------------------------------------- */

function App() {
  return (
    <div className="App container my-5">

      {/* Título principal del proyecto */}
      <h1 className="text-center mb-5">Proyecto Examen</h1>

      {/* ---------------------------------------------------
           EJERCICIO 1:
           Lista de productos + carrito dinámico
         --------------------------------------------------- */}
      <section className="mb-5">
        <h2 className="mb-3">Ejercicio 1</h2>
        <ListaProductos />
      </section>

      {/* ---------------------------------------------------
           EJERCICIO 2:
           Formulario con validación y guardado en Firestore
         --------------------------------------------------- */}
      <section className="mb-5">
        <h2 className="mb-3">Formulario Ejercicio 2</h2>
        <Formulario />
      </section>

      {/* ---------------------------------------------------
           EJERCICIO 3:
           Firebase Auth + Firebase Storage
         --------------------------------------------------- */}
      <section className="mb-5">
        <h2 className="mb-3 text-center">Firebase</h2>

        <div className="row">

          {/* Autenticación con Firebase Auth */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="w-100">
              <h4 className="text-center mb-3">Identificación</h4>
              <Auth />
            </div>
          </div>

          {/* Subida de archivos con Firebase Storage */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="w-100">
              <h4 className="text-center mb-3">Subida de Archivos</h4>
              <Storage />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default App;
