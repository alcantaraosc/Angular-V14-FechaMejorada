import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListavendedorComponent } from './listavendedor.component';

describe('ListavendedorComponent', () => {
  let component: ListavendedorComponent;
  let fixture: ComponentFixture<ListavendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListavendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListavendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
