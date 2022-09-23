import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldepartamentoComponent } from './modaldepartamento.component';

describe('ModaldepartamentoComponent', () => {
  let component: ModaldepartamentoComponent;
  let fixture: ComponentFixture<ModaldepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
