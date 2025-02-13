import { Injectable } from '@angular/core';
import { Libro } from './libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosServiceService {

  private url = "http://localhost:3000/libros"
  
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

}
