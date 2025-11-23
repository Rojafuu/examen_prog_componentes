//Importaciones firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWZSLR2gdYpUgPJ9SBFKJ4C4chWFx2ngA",
  authDomain: "examen-componentes-equiposjd.firebaseapp.com",
  projectId: "examen-componentes-equiposjd",
  storageBucket: "examen-componentes-equiposjd.appspot.com",  
  appId: "1:479916385050:web:eeafffcd78ce295bc342a3"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos los servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


export default app;