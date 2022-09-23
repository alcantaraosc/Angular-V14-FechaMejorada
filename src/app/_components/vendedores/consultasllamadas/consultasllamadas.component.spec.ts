import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasllamadasComponent } from './consultasllamadas.component';

describe('ConsultasllamadasComponent', () => {
  let component: ConsultasllamadasComponent;
  let fixture: ComponentFixture<ConsultasllamadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultasllamadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasllamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
