import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModaloportunidadComponent } from './modaloportunidad.component';

describe('ModaloportunidadComponent', () => {
  let component: ModaloportunidadComponent;
  let fixture: ComponentFixture<ModaloportunidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaloportunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaloportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
