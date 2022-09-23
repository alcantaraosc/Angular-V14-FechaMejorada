import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaestatusfinancieroComponent } from './listaestatusfinanciero.component';

describe('ListaestatusfinancieroComponent', () => {
  let component: ListaestatusfinancieroComponent;
  let fixture: ComponentFixture<ListaestatusfinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaestatusfinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaestatusfinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
