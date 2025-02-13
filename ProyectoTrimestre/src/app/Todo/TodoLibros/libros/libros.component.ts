import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../libro';
import { LibrosServiceService } from '../libros-service.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-libros',
  imports: [CommonModule, RouterLink],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librosList: Libro[] = [];
    librosService: LibrosServiceService = inject(LibrosServiceService);
  
    constructor() {
      this.librosService.getAllLibros().then((librosList: Libro[]) => {
        this.librosList = librosList;
        this.librosList = librosList;
      });
    }

}
