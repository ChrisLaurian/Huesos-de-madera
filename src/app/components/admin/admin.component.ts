import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, query, where, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

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

  // Formulario para subir fotos de talleres
  nuevaFotoTaller = {
    escuela: '',
    comentario: '',
    imagenURL: ''
  };

  ngOnInit() {
    const pRef = collection(this.firestore, 'participacionesDesafios');
    // Solo traemos los que están en estado 'pendiente'
    const q = query(pRef, where('estado', '==', 'pendiente'));
    this.retosPendientes$ = collectionData(q, { idField: 'id' });
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
}
