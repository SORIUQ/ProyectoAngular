import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaBibliotecaComponent } from './mapa-biblioteca.component';

describe('MapaBibliotecaComponent', () => {
  let component: MapaBibliotecaComponent;
  let fixture: ComponentFixture<MapaBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaBibliotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
