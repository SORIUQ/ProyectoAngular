import { Routes } from '@angular/router';
import { BuscadorComponent } from './Todo/buscador/buscador.component';
import { BibliotecasComponent } from './Todo/TodoBibliotecas/bibliotecas/bibliotecas.component';
import { LibrosComponent } from './Todo/TodoLibros/libros/libros.component';
import { AgregarLibrosComponent } from './Todo/TodoLibros/agregar-libros/agregar-libros.component';
import { ModificarLibrosComponent } from './Todo/TodoLibros/modificar-libros/modificar-libros.component';

export const routes: Routes = [
    {
        path: '',
        component: BuscadorComponent,
        title: 'Inicio'
    
    },
    {
        path: 'bibliotecas',
        component: BibliotecasComponent,
        title: 'Bibliotecas'
    
    },
    {
        path: 'libros',
        component: LibrosComponent,
        title: 'Libros'
    
    },
    {
        path: 'agregarLibros',
        component: AgregarLibrosComponent,
        title: 'Agregar libros'
    
    },
    {
        path: 'modificarLibros/:id',
        component: ModificarLibrosComponent,
        title: 'Modificar libros'
    
    }
];
