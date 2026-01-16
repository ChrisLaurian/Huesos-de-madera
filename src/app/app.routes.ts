import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { ComunityGalleryComponent } from './components/comunity-gallery/comunity-gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'manuales', component: ManualsComponent },
  { path: 'desafios', component: ChallengesComponent },
  { path: 'galeria', component: ComunityGalleryComponent },
  { path: '**', redirectTo: '' } // Redirige a inicio si la ruta no existe
];