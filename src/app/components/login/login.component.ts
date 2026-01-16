import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router'; // Añadimos RouterLink
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // RouterLink es necesario para el botón de volver
  templateUrl: './login.component.html', // Cambiado a archivo externo
  styleUrls: ['./login.component.css']    // Cambiado a archivo externo
})
export class LoginComponent {
  email = '';
  password = '';
  cargando = false; // Variable para el estado de carga

  private authService = inject(AuthService);
  private router = inject(Router);

  async onLogin() {
    if (!this.email || !this.password) return;
    
    this.cargando = true;
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/admin']);
    } catch (e) {
      alert("Error: Credenciales incorrectas");
      this.cargando = false;
    }
  }
}