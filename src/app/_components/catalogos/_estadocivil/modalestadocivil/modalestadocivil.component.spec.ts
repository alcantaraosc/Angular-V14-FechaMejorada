import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalestadocivilComponent } from './modalestadocivil.component';

describe('ModalestadocivilComponent', () => {
  let component: ModalestadocivilComponent;
  let fixture: ComponentFixture<ModalestadocivilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalestadocivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalestadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
