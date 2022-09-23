import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaestatusoportunidadComponent } from './listaestatusoportunidad.component';

describe('ListaestatusoportunidadComponent', () => {
  let component: ListaestatusoportunidadComponent;
  let fixture: ComponentFixture<ListaestatusoportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaestatusoportunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaestatusoportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
