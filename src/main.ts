import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// 1. IMPORTANTE: Importar 'importProvidersFrom'
import { importProvidersFrom } from '@angular/core';

// 2. Importar los Módulos (Sintaxis para Angular 16 estable)
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

// Pega aquí tus credenciales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCi-dRfcMUBLPSwj2xYcTdWmXSOYeYMfkg",
  authDomain: "personal-db-8afe4.firebaseapp.com",
  databaseURL: "https://personal-db-8afe4-default-rtdb.firebaseio.com",
  projectId: "personal-db-8afe4",
  storageBucket: "personal-db-8afe4.firebasestorage.app",
  messagingSenderId: "109171031987",
  appId: "1:109171031987:web:d66688b162d5aab4bc55c6"
};

bootstrapApplication(AppComponent, {
providers: [
    provideRouter(routes),
    
    // 3. Envolvemos las funciones en 'importProvidersFrom'
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    )
  ]
}).catch(err => console.error(err));