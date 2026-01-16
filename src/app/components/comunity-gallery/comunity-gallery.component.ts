import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, query, orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comunity-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunity-gallery.component.html',
  styleUrls: ['./comunity-gallery.component.css']
})
export class ComunityGalleryComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  // Observables para los dos tipos de fotos
  retosComunidad$: Observable<any[]> | undefined;
  fotosTalleres$: Observable<any[]> | undefined;

  tabActual: 'retos' | 'talleres' = 'retos';

  ngOnInit() {
    // 1. Cargar Retos de los usuarios
    const retosRef = collection(this.firestore, 'participacionesDesafios');
    const qRetos = query(retosRef, where('estado', '==', 'publicado'), orderBy('fecha', 'desc'));
    this.retosComunidad$ = collectionData(qRetos);

    // 2. Cargar Fotos de Talleres (Sección Admin)
    const talleresRef = collection(this.firestore, 'fotosTalleres');
    const qTalleres = query(talleresRef, orderBy('fecha', 'desc'));
    this.fotosTalleres$ = collectionData(qTalleres);
  }

  cambiarTab(tab: 'retos' | 'talleres') {
    this.tabActual = tab;
  }
}