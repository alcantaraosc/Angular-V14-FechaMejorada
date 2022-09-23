import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListallamadasliderComponent } from './listallamadaslider.component';

describe('ListallamadasliderComponent', () => {
  let component: ListallamadasliderComponent;
  let fixture: ComponentFixture<ListallamadasliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallamadasliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallamadasliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
