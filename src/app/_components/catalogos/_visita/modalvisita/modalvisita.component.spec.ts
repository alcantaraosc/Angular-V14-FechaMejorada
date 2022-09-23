import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalvisitaComponent } from './modalvisita.component';

describe('ModalvisitaComponent', () => {
  let component: ModalvisitaComponent;
  let fixture: ComponentFixture<ModalvisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalvisitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalvisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
