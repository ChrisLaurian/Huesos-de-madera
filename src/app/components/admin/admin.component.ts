import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, query, where, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { docData } from 'rxfire/firestore';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  // Participaciones de retos pendientes
  retosPendientes$: Observable<any[]> | undefined;
  retosPublicados$: Observable<any[]> | undefined;
  fotosTalleres$: Observable<any[]> | undefined;
  vistas$: Observable<any> | undefined;

  // Formulario para subir fotos de talleres
  nuevaFotoTaller = {
    escuela: '',
    comentario: '',
    imagenURL: ''
  };

ngOnInit() {
    const pRef = collection(this.firestore, 'participacionesDesafios');
    const tRef = collection(this.firestore, 'fotosTalleres');
    const statsRef = doc(this.firestore, 'stats', 'contadorPrincipal');

    this.vistas$ = docData(statsRef);
    // 1. Pendientes
    const qPendientes = query(pRef, where('estado', '==', 'pendiente'));
    this.retosPendientes$ = collectionData(qPendientes, { idField: 'id' });

    // 2. Ya publicados (para poder borrarlos o editarlos)
    const qPublicados = query(pRef, where('estado', '==', 'publicado'));
    this.retosPublicados$ = collectionData(qPublicados, { idField: 'id' });

    // 3. Galería de talleres
    this.fotosTalleres$ = collectionData(tRef, { idField: 'id' });
  }  

  // APROBAR RETO
  async aprobarReto(id: string) {
    const docRef = doc(this.firestore, 'participacionesDesafios', id);
    await updateDoc(docRef, { estado: 'publicado' });
    alert("Reto aprobado y visible en la galería.");
  }

  // RECHAZAR/BORRAR RETO
  async rechazarReto(id: string) {
    if(confirm("¿Estás seguro de eliminar esta propuesta?")) {
      const docRef = doc(this.firestore, 'participacionesDesafios', id);
      await deleteDoc(docRef);
    }
  }

  // SUBIR FOTO DE TALLER (ADMIN)
  async subirFotoTaller() {
    if (!this.nuevaFotoTaller.imagenURL || !this.nuevaFotoTaller.escuela) return;

    try {
      await addDoc(collection(this.firestore, 'fotosTalleres'), {
        ...this.nuevaFotoTaller,
        fecha: new Date()
      });
      alert("¡Foto de taller añadida con éxito!");
      this.nuevaFotoTaller = { escuela: '', comentario: '', imagenURL: '' };
    } catch (e) { console.error(e); }
  }

  async borrarPublicacion(id: string) {
    if(confirm("¿Deseas quitar esta foto de la galería pública?")) {
      const docRef = doc(this.firestore, 'participacionesDesafios', id);
      await deleteDoc(docRef);
    }
  }

  async borrarFotoTaller(id: string) {
    if(confirm("¿Eliminar esta foto de taller?")) {
      const docRef = doc(this.firestore, 'fotosTalleres', id);
      await deleteDoc(docRef);
    }
  }
}
