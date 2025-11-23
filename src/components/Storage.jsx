// ---------------------------------------------------------
// Componente: Storage.js
// Descripción general:
// Este componente corresponde al Ejercicio 3 de la evaluación.
// Permite seleccionar un archivo desde el dispositivo del usuario
// y subirlo a Firebase Storage utilizando un componente de clase.
//
// Este archivo demuestra:
//  - Manejo de estado con this.state
//  - Lectura de archivos desde un input tipo file
//  - Interacción con servicios cloud (Firebase Storage)
//  - Seguimiento del progreso de carga en tiempo real
//  - Obtención de la URL pública del archivo subido
// ---------------------------------------------------------

import React, { Component } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; 

class Storage extends Component {
  constructor(props) {
    super(props);

    // -----------------------------------------------------
    // Estado inicial del componente:
    // file       → archivo seleccionado por el usuario
    // progreso   → porcentaje de subida del archivo
    // urlArchivo → link de descarga una vez completada la carga
    // -----------------------------------------------------
    this.state = {
      file: null,
      progreso: 0,
      urlArchivo: ''
    };
  }

  // -------------------------------------------------------
  // manejarArchivo:
  // Se ejecuta cuando el usuario selecciona un archivo.
  // Guarda el archivo dentro del estado para luego subirlo.
  // -------------------------------------------------------
  manejarArchivo = (e) => {
    if (e.target.files[0]) {
      this.setState({ file: e.target.files[0] });
    }
  }

  // -------------------------------------------------------
  // subirArchivo:
  // Función principal que realiza la subida del archivo.
  // Usa 'uploadBytesResumable' para obtener el progreso
  // y manejar distintos estados del proceso.
  // -------------------------------------------------------
  subirArchivo = () => {
    const { file } = this.state;

    // Validación simple: asegurarse de que haya un archivo seleccionado
    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    // Creamos una referencia dentro de Firebase Storage
    // El archivo quedará almacenado en la carpeta "archivos/"
    const storageRef = ref(storage, `archivos/${file.name}`);

    // Inicio de la subida con seguimiento del progreso
    const uploadTask = uploadBytesResumable(storageRef, file);

    // ---------------------------------------------------
    // uploadTask.on() escucha el avance de la subida
    // Tiene tres posibles respuestas: progreso, error, éxito
    // ---------------------------------------------------
    uploadTask.on(
      "state_changed",

      // PROGRESO: se actualiza en tiempo real
      (snapshot) => {
        const progreso = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progreso });
      },

      // ERROR: en caso de fallar la subida
      (error) => {
        console.error("Error al subir archivo:", error);
        alert("Error al subir archivo: " + error.message);
      },

      // ÉXITO: cuando termina la carga se obtiene la URL pública
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          this.setState({ urlArchivo: url });
          alert("Archivo subido con éxito!");
        });
      }
    );
  }

  // -------------------------------------------------------
  // render:
  // Muestra el input para seleccionar archivo, el botón para
  // subirlo, el porcentaje de progreso y el enlace final.
  // -------------------------------------------------------
  render() {
    const { progreso, urlArchivo } = this.state;

    return (
      <div className="w-75 mx-auto my-3 p-3 border rounded shadow-sm bg-light text-center">

        <h4 className="mb-3">Subir archivo a Storage</h4>

        {/* Input para seleccionar archivo */}
        <input
          type="file"
          onChange={this.manejarArchivo}
          className="form-control mb-3"
        />

        {/* Botón que inicia la subida */}
        <button
          onClick={this.subirArchivo}
          className="btn btn-primary mb-3"
        >
          Subir Archivo
        </button>

        {/* Muestra del progreso */}
        {progreso > 0 && <div className="mb-2">Progreso: {progreso}%</div>}

        {/* URL de descarga del archivo */}
        {urlArchivo && (
          <div>
            <a
              href={urlArchivo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver archivo subido
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Storage;
