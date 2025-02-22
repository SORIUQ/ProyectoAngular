import { Routes } from '@angular/router';
import { BuscadorComponent } from './shared/buscador/buscador.component';
import { BibliotecasComponent } from './features/biblioteca/components/bibliotecas/bibliotecas.component';
import { LibrosComponent } from './features/libro/components/libros/libros.component';
import { AgregarLibrosComponent } from './features/libro/components/agregar-libros/agregar-libros.component';
import { ModificarLibrosComponent } from './features/libro/components/modificar-libros/modificar-libros.component';

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
