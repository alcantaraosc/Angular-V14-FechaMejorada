import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListavisitaComponent } from './listavisita.component';

describe('ListavisitaComponent', () => {
  let component: ListavisitaComponent;
  let fixture: ComponentFixture<ListavisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListavisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListavisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
