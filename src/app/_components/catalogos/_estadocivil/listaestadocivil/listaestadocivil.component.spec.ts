import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaestadocivilComponent } from './listaestadocivil.component';

describe('ListaestadocivilComponent', () => {
  let component: ListaestadocivilComponent;
  let fixture: ComponentFixture<ListaestadocivilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaestadocivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaestadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
