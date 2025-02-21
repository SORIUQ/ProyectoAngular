import { ChangeDetectorRef, Component,inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../libro';
import { LibrosServiceService } from '../libros-service.service';
import { RouterLink } from '@angular/router';
import { BibliotecasServiceService } from '../../TodoBibliotecas/bibliotecas-service.service';
import { Biblioteca } from '../../TodoBibliotecas/biblioteca';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libros',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit, OnChanges{

  librosList: Libro[] = [];
  librosService: LibrosServiceService = inject(LibrosServiceService);
  
  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);

  bibliotecaSeleccionada: string = '0';
  librosFiltrados: Libro[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    this.cargarLibros();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataChanged']) {
      this.cargarLibros();
    }
  }

  cargarLibros() {
    this.librosService.getAllLibros().then((librosList2: Libro[]) => {
      this.librosList = librosList2;
      this.filtrarLibros();
    });
    
    this.bibliotecaService.getAllBibliotecas().then((bibliotecasList2: Biblioteca[]) => {
      this.bibliotecasList = bibliotecasList2;
    });

    this.changeDetectorRef.detectChanges();
  }

  filtrarLibros() {
    if (this.bibliotecaSeleccionada != "0") {
      this.librosFiltrados = this.librosList.filter(libro => libro.biblioteca_id == parseInt(this.bibliotecaSeleccionada));
    } else {
      this.librosFiltrados = this.librosList;
    }
  }


  async eliminarLibro(libro: Libro) {

    this.bibliotecaService.getBibliotecaById(libro.biblioteca_id).then(async (biblioteca) => {
      if (!biblioteca) {
        alert("Biblioteca no encontrada");
        return;
      }

      const index = biblioteca.libros.findIndex(libro2 => libro2 === libro.titulo);
      if (index !== -1) {
        biblioteca.libros.splice(index, 1);
      }

      await this.bibliotecaService.actualizarBiblioteca(libro.biblioteca_id, biblioteca)
      await this.librosService.borrarLibro(libro.id!);

      this.cargarLibros();

    });
  }

}
