// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase para o seu aplicativo da web
const firebaseConfig = {
  apiKey: "AIzaSyAxgBQQXRD2r8K0x0K3zyAwdKW5UiRXFpE",
  authDomain: "task2-b9470.firebaseapp.com",
  projectId: "task2-b9470",
  storageBucket: "task2-b9470.appspot.com",
  messagingSenderId: "139135706951",
  appId: "1:139135706951:web:c47cb9c576e9338e278e62",
  measurementId: "G-9QEFMMX22L"
};

const app = initializeApp(firebaseConfig);
// Exporta a instância do Firestore
export const db = getFirestore(app);

createApp(App).use(/* ... outros plugins ... */).provide('db', db).mount('#app');
