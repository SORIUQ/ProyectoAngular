import { Injectable } from '@angular/core';
import { Biblioteca } from '../models/biblioteca';

@Injectable({
  providedIn: 'root'
})
export class BibliotecasServiceService {

  private url = "http://localhost:3002/bibliotecas"

  constructor() { }

  async getAllBibliotecas(): Promise<Biblioteca[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getBibliotecaById(id: number): Promise<Biblioteca | null> {
    const response = await fetch(`${this.url}/${id}`);
    const data = await response.json();
    return data? data : null;
  }
  
  async actualizarBiblioteca(id: number, biblioteca: Biblioteca): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(biblioteca)
    });
  }
}
