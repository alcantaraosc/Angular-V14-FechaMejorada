import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaestatusdacComponent } from './listaestatusdac.component';

describe('ListaestatusdacComponent', () => {
  let component: ListaestatusdacComponent;
  let fixture: ComponentFixture<ListaestatusdacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaestatusdacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaestatusdacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
