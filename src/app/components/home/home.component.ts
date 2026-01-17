import { Component, OnInit, inject } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { LearningPathComponent } from '../learning-path/learning-path.component';
import { ContactComponent } from '../contact/contact.component';
import { CommonModule } from '@angular/common';
import { AnaliticasService } from 'src/app/services/analitics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    LearningPathComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private analiticas = inject(AnaliticasService);

  ngOnInit() {
    this.analiticas.registrarVisita();
  }
}
