import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para el *ngFor y *ngIf

// La interfaz va FUERA de la clase
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
  imports: [CommonModule], // Agregamos CommonModule
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent {
  
  // Categoría seleccionada por defecto
  filtroActual: string = 'ensamble';

  desafios: Desafio[] = [
    { id: 'e1', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Creación Libre', descripcion: 'Muestra tu ingenio usando las piezas del kit para crear algo nunca antes visto.' },
    { id: 'e2', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Reino Animal', descripcion: 'Diseña una criatura (terrestre o voladora) utilizando solo encastres de madera.' },
    { id: 'e3', categoria: 'ensamble', nivel: 'Creativo', titulo: 'Huesos sobre Ruedas', descripcion: 'Crea un vehículo aerodinámico o de carga con el sistema de ensamblaje.' },
    { id: 'a1', categoria: 'arduino', nivel: 'Master', titulo: 'Robot Ultrasónico BT', descripcion: 'Diseña un robot que esquive obstáculos y se controle vía Bluetooth.' },
    { id: 'a2', categoria: 'arduino', nivel: 'Creativo', titulo: 'Código Abierto Creativo', descripcion: 'Inventa una función nueva para tu kit (luces, sonidos, movimientos complejos).' },
    { id: 'el1', categoria: 'electrico', nivel: 'Técnico', titulo: 'Mejora de Circuitos', descripcion: '¿Encontraste una forma más eficiente de conectar los manuales? ¡Compártela!' },
    { id: 'el2', categoria: 'electrico', nivel: 'Creativo', titulo: 'Circuitos de Autor', descripcion: 'Crea un diseño eléctrico original (ej. un letrero luminoso o sensor de humedad).' }
  ];

  // Función para filtrar los desafíos en la vista
  get desafiosFiltrados() {
    return this.desafios.filter(d => d.categoria === this.filtroActual);
  }

  cambiarFiltro(categoria: string) {
    this.filtroActual = categoria;
  }

  openUploadModal(nombreReto: string) {
    console.log('Participando en:', nombreReto);
    const descripcion = prompt("Cuéntanos sobre tu solución:");
    if(descripcion) {
      alert("¡Gracias por participar! Pronto habilitaremos la subida de imágenes a Firebase.");
    }
  }
}