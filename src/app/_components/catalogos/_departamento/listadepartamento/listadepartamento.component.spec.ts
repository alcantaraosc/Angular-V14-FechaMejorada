import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadepartamentoComponent } from './listadepartamento.component';

describe('ListadepartamentoComponent', () => {
  let component: ListadepartamentoComponent;
  let fixture: ComponentFixture<ListadepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
