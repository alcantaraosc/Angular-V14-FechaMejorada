import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamunicipioComponent } from './listamunicipio.component';

describe('ListamunicipioComponent', () => {
  let component: ListamunicipioComponent;
  let fixture: ComponentFixture<ListamunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListamunicipioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListamunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
