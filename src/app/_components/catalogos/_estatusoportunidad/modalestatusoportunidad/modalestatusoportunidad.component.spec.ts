import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalestatusoportunidadComponent } from './modalestatusoportunidad.component';

describe('ModalestatusoportunidadComponent', () => {
  let component: ModalestatusoportunidadComponent;
  let fixture: ComponentFixture<ModalestatusoportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalestatusoportunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalestatusoportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
