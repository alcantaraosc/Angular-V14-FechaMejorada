import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalllamadasfinancieroComponent } from './modalllamadasfinanciero.component';

describe('ModalllamadasfinancieroComponent', () => {
  let component: ModalllamadasfinancieroComponent;
  let fixture: ComponentFixture<ModalllamadasfinancieroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalllamadasfinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalllamadasfinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
