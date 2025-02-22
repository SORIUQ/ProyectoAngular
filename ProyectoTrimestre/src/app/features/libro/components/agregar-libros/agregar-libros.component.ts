import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Biblioteca } from '../../../../core/models/biblioteca';
import { BibliotecasServiceService } from '../../../../core/services/bibliotecas-service.service';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LibrosServiceService } from '../../../../core/services/libros-service.service';



@Component({
  selector: 'app-agregar-libros',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-libros.component.html',
  styleUrl: './agregar-libros.component.css'
})
export class AgregarLibrosComponent {

  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);
  LibroService: LibrosServiceService = inject(LibrosServiceService);

  formularioLibro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.formularioLibro = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]] ,
      paginas: [0, [Validators.required, Validators.min(10)]],
      autor: ['', [Validators.required, Validators.minLength(3)]],
      biblioteca_id: [0, [Validators.required, this.validarBiblioteca]]

    });
    this.bibliotecaService.getAllBibliotecas().then((bibliotecasList: Biblioteca[]) => {
      this.bibliotecasList = bibliotecasList;
      this.bibliotecasList = bibliotecasList;
    });
  }
  
  validarBiblioteca(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value !== 0 ? null : { bibliotecaInvalida: true };
  }

  async agregarLibro() {

    let nuevoLibro = this.formularioLibro.value;

    let libroExiste = await this.LibroService.existeLibroByNombre(nuevoLibro.titulo);

    if (!libroExiste) {

      this.LibroService.agregarLibro(nuevoLibro).then((libroCreado) => {
        this.bibliotecaService.getBibliotecaById(nuevoLibro.biblioteca_id).then((biblioteca) => {
          if (!biblioteca) {
            alert("Biblioteca no encontrada");
            return;
          }
    
          biblioteca.libros.push(libroCreado.titulo);
    
          this.bibliotecaService.actualizarBiblioteca(biblioteca.id, biblioteca).then(() => {
            alert("Libro agregado correctamente");
            this.formularioLibro.reset();
          });
        });
      });
    } else {
      alert("Ya existe un libro con este título.");
    }
  }
}
