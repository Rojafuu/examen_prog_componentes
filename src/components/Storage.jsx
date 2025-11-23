// src/components/Storage.js
// Componente para subir archivos a Firebase Storage
// Utiliza componentes de clase, eventos, estado y servicios cloud (Firebase)

import React, { Component } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'; 

class Storage extends Component {
  constructor(props) {
    super(props);

    // Estado inicial del componente
    this.state = {
      file: null,       // Archivo seleccionado por el usuario
      progreso: 0,      // Porcentaje de subida
      urlArchivo: ''    // URL final del archivo subido
    };
  }

  // Maneja el archivo seleccionado por el usuario
  manejarArchivo = (e) => {
    if (e.target.files[0]) {
      this.setState({ file: e.target.files[0] });
    }
  }

  // Función principal que realiza la subida del archivo a Firebase Storage
  subirArchivo = () => {
    const { file } = this.state;

    // Validación básica
    if (!file) {
      alert("Selecciona un archivo primero");
      return;
    }

    // Creamos la referencia dentro de Storage (carpeta 'archivos/')
    const storageRef = ref(storage, `archivos/${file.name}`);

    // Subida con seguimiento de progreso
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Observador del progreso de subida
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progreso = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progreso });
      },

      // Manejo de errores durante la subida
      (error) => {
        console.error("Error al subir archivo:", error);
        alert("Error al subir archivo: " + error.message);
      },

      // Cuando la subida termina con éxito
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          this.setState({ urlArchivo: url });
          alert("Archivo subido con éxito!");
        });
      }
    );
  }

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

        {/* Muestra del progreso de subida */}
        {progreso > 0 && <div className="mb-2">Progreso: {progreso}%</div>}

        {/* Link para ver el archivo subido */}
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
