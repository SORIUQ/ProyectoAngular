import { Libro } from "../TodoLibros/libro";

export interface Biblioteca {
    id: number;
    nombre: string;
    coordenadas: {
      lat: number;
      lon: number;
    };
    libros: String[];
  }

