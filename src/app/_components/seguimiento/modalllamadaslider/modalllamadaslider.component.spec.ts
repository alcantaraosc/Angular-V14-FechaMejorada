import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalllamadasliderComponent } from './modalllamadaslider.component';

describe('ModalllamadasliderComponent', () => {
  let component: ModalllamadasliderComponent;
  let fixture: ComponentFixture<ModalllamadasliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalllamadasliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalllamadasliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
