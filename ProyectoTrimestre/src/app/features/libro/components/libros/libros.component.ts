import { ChangeDetectorRef, Component,inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../core/models/libro';
import { LibrosServiceService } from '../../../../core/services/libros-service.service';
import { RouterLink } from '@angular/router';
import { BibliotecasServiceService } from '../../../../core/services/bibliotecas-service.service';
import { Biblioteca } from '../../../../core/models/biblioteca';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-libros',
  imports: [CommonModule, RouterLink, FormsModule, DragDropModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit, OnChanges{

  librosList: Libro[] = [];
  librosService: LibrosServiceService = inject(LibrosServiceService);
  
  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);

  librosFavoritos: Libro[] = [];

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

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      let libroCopiado = { ...event.previousContainer.data[event.previousIndex] };

      if (!this.librosFavoritos.some(libro => libro.id === libroCopiado.id)) {
        this.librosFavoritos.push(libroCopiado);
      }
    }
  }

  eliminarDeFavoritos(libro: any) {
    this.librosFavoritos = this.librosFavoritos.filter(librofav => librofav.id !== libro.id);
  }

}
