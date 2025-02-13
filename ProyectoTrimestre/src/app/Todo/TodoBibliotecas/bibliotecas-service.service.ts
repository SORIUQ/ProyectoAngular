import { Injectable } from '@angular/core';
import { Biblioteca } from './biblioteca';

@Injectable({
  providedIn: 'root'
})
export class BibliotecasServiceService {

  private url = "http://localhost:3000/bibliotecas"

  constructor() { }

  async getAllBibliotecas(): Promise<Biblioteca[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getBibliotecaByNombre(nombre: string): Promise<Biblioteca | null> {
    const response = await fetch(`${this.url}?nombre=${nombre}`);
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  }
  
  async actualizarBiblioteca(id: number, biblioteca: Biblioteca): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biblioteca)
    });
  }
}
