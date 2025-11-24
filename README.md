 Desarrollo Examen Programacion de Componentes

El proyecto se organizó en una carpeta principal llamada components, donde se desarrollaron todos los ejercicios solicitados en la evaluación utilizando React con componentes de clase. Para asegurar orden y claridad, cada funcionalidad fue implementada en un componente independiente.

----------------------------------------------

Requisitos e Instalación del Proyecto

Para ejecutar el proyecto en entorno local se requiere:

Node.js 16+

npm o yarn

Configuración de Firebase (credenciales del proyecto en archivo de inicialización)

(Opcional) Cordova instalado globalmente para el empaquetado móvil

$ npm install -g cordova

----------------------------------------------

Instalación

Clonar el repositorio:

$ git clone https://github.com/Rojafuu/examen_prog_componentes.git


Ingresar a la carpeta del proyecto (donde está el React principal):

$ cd examen_prog_componentes


Instalar dependencias:

$ npm install


Crear o verificar el archivo de configuración de Firebase (por ejemplo: firebaseConfig.js dentro de src/config) con las credenciales entregadas por Firebase Console.

Ejecutar el proyecto:

$ npm start


La aplicación se ejecutará en http://localhost:3000/.

----------------------------------------------


Ejercicio 1 — Lista de Productos y Carrito

Para este ejercicio se implementaron los componentes:

ListaProductos.js (componente padre)

ProductoItem.js (componente hijo)

La lógica principal está basada en:

Manejo de estado con this.state

Actualización dinámica de datos con this.setState

Comunicación entre componentes padre ↔ hijo usando props y callbacks

En el componente ListaProductos.js, se definió un arreglo de productos y un carrito. Al hacer clic en "Agregar al carrito", el componente hijo ejecuta una función recibida por props, y esta agrega el producto al estado del componente padre.
También se implementó la opción de eliminar elementos individualmente desde el carrito, cumpliendo con los requisitos de interacción dinámica.

----------------------------------------------

Ejercicio 2 — Formulario con Validación y Firestore

Para este ejercicio se desarrolló el componente:

Formulario.js

Este formulario utiliza this.state para manejar los valores ingresados y aplica validaciones mediante la librería simple-react-validator, permitiendo:

Mostrar mensajes personalizados cuando un campo está vacío.

Validar que el email tenga un formato correcto.

Evitar envíos con datos incompletos.

Al enviar el formulario correctamente, los datos se almacenan en una colección de Firebase Firestore, cumpliendo con el requisito de persistencia en la nube.
Después de guardar, el formulario se reinicia automáticamente para permitir un nuevo ingreso.

----------------------------------------------

Ejercicio 3 — Firebase Auth + Firebase Storage

Este ejercicio consta de dos componentes:

Auth.js — Autenticación

Permite:

Iniciar sesión con correo y contraseña.

Gestionar el estado del usuario dentro del componente.

Mostrar diferentes vistas según el estado de autenticación.

Se utilizó Firebase Auth, cumpliendo con el requerimiento de integrar autenticación real en la aplicación.

Storage.js — Subida de archivos

Permite:

Seleccionar un archivo desde el dispositivo.

Ver el progreso de carga en tiempo real.

Obtener la URL de descarga cuando el archivo llega al servidor.

Aunque la lógica está funcionando correctamente, el grupo detectó un problema de CORS en Firebase Storage, por lo que esta parte queda pendiente de ajuste en el entorno final. La implementación está correctamente desarrollada desde React.

----------------------------------------------

Exportación a Cordova

La aplicación está preparada para empaquetarse como aplicación móvil mediante Cordova.

Tareas consideradas:

Configurar entorno Cordova.

Integrar la carpeta build generada por React en cordova/www.

Construir APK:

$ cordova build android


Firma del APK mediante keystore.

Generación del archivo final .apk.

Pruebas en dispositivo real.

Grabación del video explicativo solicitado por la evaluación.

La estructura del proyecto permite el empaquetado sin modificaciones adicionales

El resultado es un proyecto modular, claro y funcional, donde cada ejercicio cumple las condiciones solicitadas con React y Firebase.

Integrantes:
-Daniela Fuentes Escobar
-Stephanie Lazo Cornejo
-Joaquin Villalon Muñoz