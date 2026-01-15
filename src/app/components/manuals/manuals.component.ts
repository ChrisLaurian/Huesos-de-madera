import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';

@Component({
  selector: 'app-manuals',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.css']
})
export class ManualsComponent {
  categoriaSeleccionada: 'mdf' | 'electrico' = 'mdf';
  mostrarModal = false;
  pdfSeleccionado: string | null = null;
  tituloManual: string = '';

  proyectos = [
    { id: '01', nombre: 'Lampara LED', electrico: true, mdf: true },
    { id: '02', nombre: 'Perro', electrico: true, mdf: true },
    { id: '03', nombre: 'Cangrejo', electrico: true, mdf: true },
    { id: '04', nombre: 'Carro Mecanico', electrico: true, mdf: true },
    { id: '05', nombre: 'Carro electrico', electrico: true, mdf: true },
    { id: '06', nombre: 'Escorpion', electrico: true, mdf: true },
    { id: '07', nombre: 'Reactor de Iron Man', electrico: true, mdf: true },
    { id: '08', nombre: 'Semaforo', electrico: true, mdf: true },
    { id: '09', nombre: 'Catapulta', electrico: false, mdf: true },
    { id: '10', nombre: 'Virus', electrico: true, mdf: true }
  ];

  get manualesFiltrados() {
    return this.categoriaSeleccionada === 'mdf' 
      ? this.proyectos.filter(p => p.mdf) 
      : this.proyectos.filter(p => p.electrico);
  }

  // Una sola función para generar la ruta
  getRutaArchivo(proyecto: any): string {
    let tipo = '';
    if (this.categoriaSeleccionada === 'mdf') {
      tipo = 'Ensamble';
    } else {
      tipo = (proyecto.id === '01') ? 'Electronica' : 'Electrónica';
    }
    return `assets/pdf/Instructivo ${proyecto.id} ${tipo}.pdf`;
  }

  abrirManual(proyecto: any) {
    this.tituloManual = `Manual: ${proyecto.nombre}`;
    this.pdfSeleccionado = this.getRutaArchivo(proyecto);
    
    // Esto te ayudará a ver en la consola si la ruta es correcta
    console.log("Intentando abrir:", this.pdfSeleccionado);
    
    this.mostrarModal = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarManual() {
    this.mostrarModal = false;
    this.pdfSeleccionado = null;
    document.body.style.overflow = 'auto';
  }

  cambiarCategoria(cat: 'mdf' | 'electrico') {
    this.categoriaSeleccionada = cat;
  }
}