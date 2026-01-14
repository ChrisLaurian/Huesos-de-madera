import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para el formulario

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contacto = {
    nombre: '',
    escuela: '',
    correo: '',
    mensaje: ''
  };

  enviarFormulario() {
    console.log('Datos enviados:', this.contacto);
    alert('¡Gracias por contactarnos! Un asesor de Huesos de Madera se comunicará con tu escuela pronto.');
    // Aquí podrías resetear el formulario
    this.contacto = { nombre: '', escuela: '', correo: '', mensaje: '' };
  }
}