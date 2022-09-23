import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapersonaldacComponent } from './listapersonaldac.component';

describe('ListapersonaldacComponent', () => {
  let component: ListapersonaldacComponent;
  let fixture: ComponentFixture<ListapersonaldacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapersonaldacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapersonaldacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
