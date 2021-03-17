import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  startPage: boolean = false;
  gameMode: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAndSetExercises();
    this.getAndSetGameExercises();
  }

  getAndSetExercises = () => {
    this.exerciseService.getExercises().subscribe((response: any) => {
      console.log(response);
      this.exercises = response;
      if (this.filterTerms.name) {
        this.exercises = this.exercises.filter((item) =>
          item.name.toLowerCase().includes(this.filterTerms.name.toLowerCase())
        );
      }
      if (this.filterTerms.bodyPart) {
        let idInput = parseInt(this.filterTerms.bodyPart);
        this.exercises = this.exercises.filter(
          (item) => item.body_part_id === idInput
        );
      }
      if (this.filterTerms.difficulty) {
        let maxDifficulty = parseInt(this.filterTerms.difficulty);

        this.exercises = this.exercises.filter((item) => {
          console.log(item.difficulty <= maxDifficulty);
          return item.difficulty <= maxDifficulty;
        });
      }
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

  addToGame = (exercise: any): boolean => {
    if (
      !this.cardExercises.find(
        (item) => item.exercise_id === exercise.exercise_id
      )
    ) {
      this.exerciseService.addExerciseToGame(exercise);
      this.getAndSetGameExercises();
      return true;
    } else {
      return false;
    }
  };

  removeFromGame = (exercise: any) => {
    this.exerciseService.removeExerciseFromGame(exercise);
    this.getAndSetGameExercises();
  };

  startGame = () => {
    if (this.cardExercises.length < 10) {
      this.startPage = true;
    } else {
      this.router.navigateByUrl('/card-game');
    }
  };

  toggleStartPage = () => {
    this.startPage = !this.startPage;
  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * this.exercises.length);
  };

  randomlyGenerateExercises = () => {
    let amountNeeded = 10 - this.cardExercises.length;
    for (let i = 0; i < amountNeeded; i++) {
      let added: boolean = false;
      while (!added) {
        let index = this.getRandomIndex();
        added = this.addToGame(this.exercises[index]);
      }
    }
    this.router.navigateByUrl('/card-game');
  };
}
