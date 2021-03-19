import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificWorkoutFormComponent } from './specific-workout-form.component';

describe('SpecificWorkoutFormComponent', () => {
  let component: SpecificWorkoutFormComponent;
  let fixture: ComponentFixture<SpecificWorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificWorkoutFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificWorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
