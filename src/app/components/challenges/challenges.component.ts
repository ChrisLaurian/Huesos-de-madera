import { Component, inject } from '@angular/core';
// Eliminamos Storage, solo dejamos Firestore
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Desafio {
  id: string;
  categoria: 'ensamble' | 'arduino' | 'electrico';
  titulo: string;
  descripcion: string;
  nivel: 'Creativo' | 'Técnico' | 'Master';
  premio?: string;
}

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
  // Inyectamos solo Firestore
  private firestore: Firestore = inject(Firestore);

  mostrarModal: boolean = false;
  retoSeleccionado: string = ''; 
  nuevaDescripcion: string = '';
  
  // CAMBIO CLAVE: Ya no usamos File, ahora usamos un String para la URL
  urlImagenExterna: string = ''; 
  
  filtroActual: string = 'ensamble';

  desafios: Desafio[] = [
    { id: 'e1', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Creación Libre', descripcion: 'Muestra tu ingenio usando las piezas del kit para crear algo nunca antes visto.' },
    { id: 'e2', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Reino Animal', descripcion: 'Diseña una criatura utilizando solo encastres de madera.' },
    { id: 'e3', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Huesos sobre Ruedas', descripcion: 'Crea un vehículo aerodinámico o de carga con el sistema de ensamblaje.' },
    { id: 'a1', categoria: 'arduino', nivel: 'Master', titulo: 'Robot Ultrasónico BT', descripcion: 'Diseña un robot que esquive obstáculos y se controle vía Bluetooth.' },
    { id: 'a2', categoria: 'arduino', nivel: 'Creativo', titulo: 'Código Abierto Creativo', descripcion: 'Inventa una función nueva para tu kit.' },
    { id: 'el1', categoria: 'electrico', nivel: 'Técnico', titulo: 'Mejora de Circuitos', descripcion: '¿Encontraste una forma más eficiente de conectar los manuales?' },
    { id: 'el2', categoria: 'electrico', nivel: 'Creativo', titulo: 'Circuitos de Autor', descripcion: 'Crea un diseño eléctrico original.' }
  ];

  get desafiosFiltrados() {
    return this.desafios.filter(d => d.categoria === this.filtroActual);
  }

  cambiarFiltro(categoria: string) {
    this.filtroActual = categoria;
  }

  openUploadModal(nombreReto: string) {
    this.retoSeleccionado = nombreReto;
    this.mostrarModal = true;
  }

  // Eliminamos onFileSelected() ya que no procesaremos archivos locales

  async subirAFirebase() {
    // Validamos que el link no esté vacío
    if (!this.urlImagenExterna || !this.retoSeleccionado) {
      alert("Por favor pega el link de tu imagen y escribe una descripción.");
      return;
    }

    try {
      const participacion = {
        reto: this.retoSeleccionado,
        descripcion: this.nuevaDescripcion,
        imagenURL: this.urlImagenExterna, // Guardamos el link de PostImages/Imgur
        fecha: new Date(),
        estado: 'pendiente'
      };

      // Guardamos el documento en la colección de Firestore
      await addDoc(collection(this.firestore, 'participacionesDesafios'), participacion);

      alert("¡Propuesta enviada con éxito! Gracias por compartir.");
      this.resetForm();

    } catch (error) {
      console.error("Error guardando en Firestore:", error);
      alert("Hubo un error al enviar. Revisa las reglas de Firestore.");
    }
  }

  resetForm() {
    this.mostrarModal = false;
    this.nuevaDescripcion = '';
    this.urlImagenExterna = '';
    this.retoSeleccionado = '';
  }
}