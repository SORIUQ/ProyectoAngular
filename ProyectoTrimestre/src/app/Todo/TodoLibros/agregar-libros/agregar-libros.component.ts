import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Biblioteca } from '../../TodoBibliotecas/biblioteca';
import { BibliotecasServiceService } from '../../TodoBibliotecas/bibliotecas-service.service';
import { FormsModule } from '@angular/forms';
import { Libro } from '../libro';
import { LibrosServiceService } from '../libros-service.service';


@Component({
  selector: 'app-agregar-libros',
  imports: [CommonModule, FormsModule],
  templateUrl: './agregar-libros.component.html',
  styleUrl: './agregar-libros.component.css'
})
export class AgregarLibrosComponent {

  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);
  LibroService: LibrosServiceService = inject(LibrosServiceService);
  
  constructor() {
    this.bibliotecaService.getAllBibliotecas().then((bibliotecasList: Biblioteca[]) => {
      this.bibliotecasList = bibliotecasList;
      this.bibliotecasList = bibliotecasList;
    });
  }

  
  nuevoLibro: Libro = {
    titulo: "",
    autor: "",
    paginas: 0,
    biblioteca: ""
  };

  agregarLibro() {

    if (!(this.nuevoLibro.titulo && this.nuevoLibro.autor && this.nuevoLibro.paginas && this.nuevoLibro.biblioteca)) {
      alert("Todos los campos son obligatorios")
      return;
    }

    this.LibroService.agregarLibro(this.nuevoLibro).then((libroCreado) => {
      // Paso 2: Buscar la biblioteca correspondiente
      this.bibliotecaService.getBibliotecaByNombre(this.nuevoLibro.biblioteca).then((biblioteca) => {
        if (!biblioteca) {
          alert("Biblioteca no encontrada");
          return;
        }
  
        // Paso 3: Agregar el título del libro a la lista de libros de la biblioteca
        biblioteca.libros.push(libroCreado.titulo);
  
        console.log(biblioteca.id)
        // Paso 4: Actualizar la biblioteca en el JSON Server
        this.bibliotecaService.actualizarBiblioteca(biblioteca.id, biblioteca).then(() => {
          alert("Libro agregado correctamente");
          this.nuevoLibro = { titulo: "", autor: "", paginas: 0, biblioteca: "" };
        });
      });
    });
    
  }
}
