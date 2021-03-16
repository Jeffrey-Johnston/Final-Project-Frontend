import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExercisesComponent } from './game-exercises.component';

describe('GameExercisesComponent', () => {
  let component: GameExercisesComponent;
  let fixture: ComponentFixture<GameExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameExercisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
