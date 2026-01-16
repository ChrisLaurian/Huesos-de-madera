import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser'; // 1. Importamos la librería

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

  cargando = false; // Para deshabilitar el botón mientras se envía

  async enviarFormulario() {
    this.cargando = true;

    // 2. Parámetros para la plantilla de EmailJS
    // Importante: El nombre de la izquierda debe ser igual al de las llaves {{}} en EmailJS
    const templateParams = {
      nombre: this.contacto.nombre,
      escuela: this.contacto.escuela, // Agrega {{escuela}} en tu plantilla de EmailJS si quieres verlo
      correo: this.contacto.correo,
      mensaje: this.contacto.mensaje
    };

    try {
      // 3. Envío del correo
      await emailjs.send(
        'service_4l39g2r', // Reemplaza con tu SERVICE ID
        'template_p17vx19', // Reemplaza con tu TEMPLATE ID
        templateParams,
        'p4xiqt6spmvJrqqe0' // Reemplaza con tu PUBLIC KEY (sección Account)
      );

      alert('¡Gracias por contactarnos! El equipo de Huesos de Madera ha recibido tu mensaje.');
      
      // 4. Resetear formulario
      this.contacto = { nombre: '', escuela: '', correo: '', mensaje: '' };

    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.');
    } finally {
      this.cargando = false;
    }
  }
}