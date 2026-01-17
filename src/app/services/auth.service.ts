import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
// Añadimos Firestore a la inyección
import { Firestore, collection, getDocs, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore); // <--- ESTO ES LO QUE FALTABA
  
  user$: Observable<User | null> = user(this.auth);

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout() {
    return signOut(this.auth);
  }

  // --- MÉTODOS DE BASE DE DATOS ---

  async eliminarEntrada(nombreColeccion: string, id: string) {
    try {
      const docRef = doc(this.firestore, `${nombreColeccion}/${id}`);
      await deleteDoc(docRef);
      console.log(`Documento ${id} eliminado de ${nombreColeccion}`);
    } catch (error) {
      console.error("Error al eliminar:", error);
      throw error;
    }
  }

  async actualizarEntrada(nombreColeccion: string, id: string, data: any) {
    try {
      const docRef = doc(this.firestore, `${nombreColeccion}/${id}`);
      await updateDoc(docRef, data);
      console.log(`Documento ${id} actualizado`);
    } catch (error) {
      console.error("Error al actualizar:", error);
      throw error;
    }
  }
}