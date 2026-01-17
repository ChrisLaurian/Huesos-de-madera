import { inject, Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, increment, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnaliticasService {
  private firestore: Firestore = inject(Firestore);

  async registrarVisita() {
    const docRef = doc(this.firestore, 'stats', 'contadorPrincipal');
    
    try {
      // 'increment(1)' es una función especial de Firebase que suma sin tener que leer el dato antes
      await updateDoc(docRef, {
        vistasTotales: increment(1)
      });
    } catch (error) {
      // Si el documento no existe todavía, lo creamos
      await setDoc(docRef, { vistasTotales: 1 });
    }
  }

  // Para leer el número en el Panel Admin
  obtenerEstadisticas() {
    return doc(this.firestore, 'stats', 'contadorPrincipal');
  }
}