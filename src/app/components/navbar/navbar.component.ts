import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth, user, signOut } from '@angular/fire/auth'; // Importa estos
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private auth: Auth = inject(Auth); // Inyectamos el servicio de Auth
  
  // Aquí está la corrección: pasamos 'this.auth' como argumento
  user$ = user(this.auth); 

  async logout() {
    try {
      await signOut(this.auth);
      alert("Sesión cerrada");
    } catch (error) {
      console.error(error);
    }
  }
}