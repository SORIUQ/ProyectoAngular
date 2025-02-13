import { Component, inject } from '@angular/core';
import { Biblioteca } from '../biblioteca';
import { BibliotecasServiceService } from '../bibliotecas-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bibliotecas',
  imports: [CommonModule],
  templateUrl: './bibliotecas.component.html',
  styleUrl: './bibliotecas.component.css'
})
export class BibliotecasComponent {

  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);

  constructor() {
    this.bibliotecaService.getAllBibliotecas().then((bibliotecasList: Biblioteca[]) => {
      this.bibliotecasList = bibliotecasList;
      this.bibliotecasList = bibliotecasList;
    });
  }

}
