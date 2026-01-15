import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManualsComponent } from './components/manuals/manuals.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'manuales', component: ManualsComponent },
  { path: '**', redirectTo: '' } // Redirige a inicio si la ruta no existe
];