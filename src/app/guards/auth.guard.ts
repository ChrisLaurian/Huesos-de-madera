import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Observamos el estado del usuario en Firebase
  return user(auth).pipe(
    take(1), // Tomamos el primer valor y cerramos la suscripción
    map(currentUser => {
      if (currentUser) {
        // Si hay un usuario logueado, permitimos el acceso
        return true;
      } else {
        // Si no hay nadie, redirigimos a la página de login
        console.warn('Acceso denegado. Debes iniciar sesión.');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
