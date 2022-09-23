import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaliderComponent } from './listalider.component';

describe('ListaliderComponent', () => {
  let component: ListaliderComponent;
  let fixture: ComponentFixture<ListaliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
