import { Injectable } from '@angular/core';
import { Libro } from './libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosServiceService {

  private url = "http://localhost:3001/libros"
  
    constructor() { }
  
    async getAllLibros(): Promise<Libro[]> {
      const data = await fetch(this.url);
      return await data.json() ?? [];
    }


    async agregarLibro(libro: Libro): Promise<Libro> {
      const response = await fetch(`${this.url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      });
      return response.json();
    }

    async getLibroById(id: string): Promise<Libro> {
      const data = await fetch(`${this.url}/${id}`);
      return await data.json();
    }

    async existeLibroByNombre(nombre: string): Promise<boolean> {
      let libros = await this.getAllLibros();
      return libros.some(libro => libro.titulo.toLowerCase() === nombre.toLowerCase());
    }

    async borrarLibro(id: number): Promise<Libro> {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    }

    async modificarLibro(id: string, libro: Libro): Promise<Libro> {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(libro)
      });
      return response.json();
    }

}
