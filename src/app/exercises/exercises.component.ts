import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  filterTerms: any = {};
  exercises: Exercise[] = [];
  cardExercises: any[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.getAndSetExercises();
  }

  getAndSetExercises = () => {
    this.exerciseService
      .getExercises(this.filterTerms)
      .subscribe((response: any) => {
        console.log(response);
        this.exercises = response;
      });
  };

  setFilterTerms = (formObject: any) => {
    this.filterTerms = formObject;
    this.getAndSetExercises();
  };

  resetFilterTerms = () => {
    this.filterTerms = {};
    this.getAndSetExercises();
  };

  addExercise = (formObject: any) => {
    this.exerciseService.addExercise(formObject).subscribe((response) => {});
    this.getAndSetExercises();
  };

  getAndSetGameExercises = () => {
    this.cardExercises = this.exerciseService.getCardExercises();
    console.log(this.cardExercises);
  };

  addToGame = (exercise: any) => {
    if (
      !this.cardExercises.find(
        (item) => item.exercise_id === exercise.exercise_id
      )
    ) {
      this.exerciseService.addExerciseToGame(exercise);
      this.getAndSetGameExercises();
    }
  };

  removeFromGame = (exercise: any) => {
    this.exerciseService.removeExerciseFromGame(exercise);
    this.getAndSetGameExercises();
  };
}
