import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalvendedorComponent } from './modalvendedor.component';

describe('ModalvendedorComponent', () => {
  let component: ModalvendedorComponent;
  let fixture: ComponentFixture<ModalvendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalvendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
