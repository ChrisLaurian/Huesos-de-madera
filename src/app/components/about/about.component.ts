import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  caracteristicas = [
    { icono: '🍂', titulo: 'Material Natural', desc: 'MDF de alta calidad cortado con precisión láser.' },
    { icono: '🧩', titulo: 'Zero Pegamento', desc: 'Sistema innovador de ensamble a presión.' },
    { icono: '🚀', titulo: 'Robótica Real', desc: 'Desde circuitos básicos hasta programación con Arduino.' },
    { icono: '♻️', titulo: 'Reutilizable', desc: 'Arma, desarma y crea algo nuevo cuantas veces quieras.' }
  ];
}