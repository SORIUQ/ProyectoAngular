import { Component, inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Biblioteca } from '../../TodoBibliotecas/biblioteca';
import { BibliotecasServiceService } from '../../TodoBibliotecas/bibliotecas-service.service';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Libro } from '../libro';
import { LibrosServiceService } from '../libros-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-libros',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-libros.component.html',
  styleUrl: './modificar-libros.component.css'
})
export class ModificarLibrosComponent {

  bibliotecasList: Biblioteca[] = [];
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);
  libro: Libro | null = null;
  libroService: LibrosServiceService = inject(LibrosServiceService);
  formularioLibro!: FormGroup;
  id: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ruta: ActivatedRoute
  ) {

    this.id = this.ruta.snapshot.paramMap.get('id');

    if(this.id) {
      this.libroService.getLibroById(this.id!).then((libroID: Libro) => {
        this.libro = libroID;
  
        this.formularioLibro = this.formBuilder.group({
          titulo: [this.libro.titulo, [Validators.required, Validators.minLength(3)]] ,
          paginas: [this.libro.paginas, [Validators.required, Validators.min(10)]],
          autor: [this.libro.autor, [Validators.required, Validators.minLength(3)]],
          biblioteca_id: [this.libro.biblioteca_id, [Validators.required, this.validarBiblioteca]]
    
        });
      });
    } else {
      this.router.navigate(['/error']);
    }
    

    this.bibliotecaService.getAllBibliotecas().then((bibliotecasList: Biblioteca[]) => {
      this.bibliotecasList = bibliotecasList;
      this.bibliotecasList = bibliotecasList;
    });

    
    
  }
  
  validarBiblioteca(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value !== 0 ? null : { bibliotecaInvalida: true };
  }

  async actualizarLibro() {

    let nuevoLibro = this.formularioLibro.value;

    let libroExiste = await this.libroService.existeLibroByNombre(nuevoLibro.titulo);

    if (!libroExiste) {
      this.libroService.modificarLibro(this.id!, nuevoLibro).then((libroCreado) => {
        this.bibliotecaService.getBibliotecaById(nuevoLibro.biblioteca_id).then((biblioteca) => {
          if (!biblioteca) {
            alert("Biblioteca no encontrada");
            return;
          }

              
          biblioteca.libros.push(libroCreado.titulo);
    
          this.bibliotecaService.actualizarBiblioteca(biblioteca.id, biblioteca).then(() => {
            alert("Libro modificado correctamente");
            this.router.navigate(["/"])
          });
        });
      });
    } else {
      alert("Ya existe un libro con este título.");
    }
  }
}
