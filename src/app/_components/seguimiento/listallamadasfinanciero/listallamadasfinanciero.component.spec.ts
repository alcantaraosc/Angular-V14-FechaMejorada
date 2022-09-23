import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListallamadasfinancieroComponent } from './listallamadasfinanciero.component';

describe('ListallamadasfinancieroComponent', () => {
  let component: ListallamadasfinancieroComponent;
  let fixture: ComponentFixture<ListallamadasfinancieroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallamadasfinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallamadasfinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
