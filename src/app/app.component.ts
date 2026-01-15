import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LearningPathComponent } from './components/learning-path/learning-path.component';
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from './components/contact/contact.component';
import { ManualsComponent } from "./components/manuals/manuals.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LearningPathComponent,
    AboutComponent,
    ContactComponent,
    ManualsComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'huesos-de-madera';
}
