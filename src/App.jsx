import React from 'react';
import ListaProductos from './components/ListaProductos';
import Formulario from './components/Formulario';
import Auth from './components/Auth';
import Storage from './components/Storage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* 
  Componente principal de la aplicación.
  Aquí se muestran los 3 ejercicios pedidos en el examen:
  Cada ejercicio está separado por secciones para mantener orden y claridad.
*/

function App() {
  return (
    <div className="App container my-5">

      {/* Título general del proyecto */}
      <h1 className="text-center mb-5">Proyecto Examen</h1>

    
      {/* EJ:N°1. Sección donde se muestra el componente que lista productos 
          y permite agregarlos y eliminarlos del carrito */}
      <section className="mb-5">
        <h2 className="mb-3">Ejercicio 1</h2>
        <ListaProductos />
      </section>

      {/*EJ:N°2. Sección del formulario con validación y guardado en Firebase */}
      <section className="mb-5">
        <h2 className="mb-3">Formulario Ejercicio 2</h2>
        <Formulario />
      </section>

      {/* EJ:N°3. Sección donde se muestran los componentes de autenticación y storage */}
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

          {/* Subida de archivos a Firebase Storage */}
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
