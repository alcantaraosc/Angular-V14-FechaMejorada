import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmunicipioComponent } from './modalmunicipio.component';

describe('ModalmunicipioComponent', () => {
  let component: ModalmunicipioComponent;
  let fixture: ComponentFixture<ModalmunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmunicipioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
