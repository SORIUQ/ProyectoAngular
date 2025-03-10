import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { BibliotecasServiceService } from '../../../../core/services/bibliotecas-service.service';
import { Biblioteca } from '../../../../core/models/biblioteca';

@Component({
  selector: 'app-mapa-biblioteca',
  imports: [],
  templateUrl: './mapa-biblioteca.component.html',
  styleUrl: './mapa-biblioteca.component.css'
})
export class MapaBibliotecaComponent {

  map!: L.Map;
  biblioteca: Biblioteca | null = null;
  id: number | null;
  bibliotecaService: BibliotecasServiceService = inject(BibliotecasServiceService);

  constructor(private ruta: ActivatedRoute) { 
    let idParam = this.ruta.snapshot.paramMap.get('id');
    this.id = (idParam !== null)? parseInt(idParam) : null;
    if (this.id) {
      this.bibliotecaService.getBibliotecaById(this.id).then((bibliotecaID: Biblioteca | null) => {
        this.biblioteca = bibliotecaID;
        this.iniciarMapa(this.biblioteca!.coordenadas.lat, this.biblioteca!.coordenadas.lon);
      });
    }
  }

  iniciarMapa(lat: number, lon: number): void {
    console.log(lat, lon);
    this.map = L.map('map', {
      center: [ lat, lon ],
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    L.marker([lat, lon]).addTo(this.map);
    this.map.setView([lat, lon], 20);
    tiles.addTo(this.map);
  }
}
