import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent {
  showGuide = false;
  kitSeleccionado: 'electrico' | 'arduino' = 'electrico'; // Kit por defecto

  mdfItems = [
    'Soporte Cuadrado', 'Soporte Circular', 'Soporte Octagonal (x2)', 'Soporte LEDS',
    'Octagono Mediano (x2)', 'Conector Pata (x18)', 'Soporte 1 LED (x4)', 'Soporte 2 LEDS (x4)', 
    'Conector 180° 3 LEDS (x6)', 'Conector S 180° (x22)', 'Soporte Conector Motor (x6)',
    'Conector simple Circular (x8)', 'Conector simple Cuadrado (x6)', 'Conector 90° (x47)', 
    'Conector 180° (x37)', 'Conector Cuadruple (x9)', 'Conector 180° 90° Triple (x3)', 
    'Soporte pila (x4)', 'Rueda (x6)', 'Extención Circular (x6)', 'Extencion Octagonal (x8)'
  ];

  electronicItems = [
    'Pila 9v', 'Broche Bateria', 'Leds(x100)', 'Resistencias (x100)',
    'LED RGB (x3)', 'Mini Switch (x4)', 'Mini Botón (x6)', 'Dupont M-M (x40)',
    'Dupont M-F (x40)', 'Protoboard (x3)', 'Motor Amarillo (x2)',
    'Potenciómetro', 'LLanta Motor (x2)', 'Zumbador (Buzzer) (x2)'
  ];

  arduinoItems = [
    'Arduino Uno', 'Fotoresistennciass (x4)', 'Sensor Ultrasonico',
    'Puente H', 'Sensor de Movimiento', 'Sesor de Temperatura (x2)',
    'Sensor Infrarrojo (x2)', 'Servo MG90 (x3)', 'Modulo Bluetooth',
    'Modulo Camara VGA','Pila 9v', 'Broche Bateria', 'Leds(x100)', 
    'Resistencias (x100)', 'LED RGB (x3)', 'Mini Switch (x4)', 
    'Mini Botón (x6)', 'Dupont M-M (x40)', 'Dupont M-F (x40)', 
    'Protoboard (x3)', 'Motor Amarillo (x2)', 'Potenciómetro', 
    'LLanta Motor (x2)', 'Zumbador (Buzzer) (x2)'
  ];

  descripciones = {
    electrico: {
      intro: 'Ideal para iniciar. 9 manuales paso a paso + creaciones ilimitadas.',
      ventaja: 'Ensamble 100% a presión, sin pegamento.',
      proyectos: [
        'Escorpión', 'Lámpara', 'Catapulta', 'Cangrejo', 'Virus', 'Carro', 'Coche Eléctrico', 'Araña'
      ]
    },
    arduino: {
      intro: 'Nivel Avanzado. Los 9 manuales básicos + 5 proyectos con programación.',
      ventaja: 'Lleva tus creaciones a la vida con código y sensores.',
      proyectos: [
        'Detector de obstáculos', 'Videovigilancia', 'Seguidor de línea', 'Radar de movimiento', 'Termometro'
      ]
    }
  };

  toggleGuide() {
    this.showGuide = !this.showGuide;
  }

  cambiarKit(tipo: 'electrico' | 'arduino') {
  this.kitSeleccionado = tipo;
  // Opcional: Cerrar la guía al cambiar de kit para que el usuario tenga que abrirla
  this.showGuide = false; 
}
}