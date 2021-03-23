import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../interfaces/exercise';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
})
export class ExercisesComponent implements OnInit {
  filterTerms: any = {};
  currentTab: string = 'exercises';
  exercises: Exercise[] = [];
  muscleGroup1: Exercise[] = [];
  muscleGroup2: Exercise[] = [];
  muscleGroup3: Exercise[] = [];
  muscleGroup4: Exercise[] = [];
  cardExercises: any[] = [];
  startPage: boolean = false;
  gameMode: boolean = false;
  darkMode!: boolean;
  descriptionPage: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAndSetExercises();
    this.getAndSetGameExercises();
    this.darkMode = this.themeService.getMode();
  }

  getAndSetExercises = () => {
    this.exerciseService.getExercises().subscribe((response: any) => {
      console.log(this.filterTerms);
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
          return item.difficulty <= maxDifficulty;
        });
      }
      for (let exercise of this.exercises) {
        if (
          exercise.body_part_id === 1 ||
          exercise.body_part_id === 2 ||
          exercise.body_part_id === 3
        ) {
          this.muscleGroup1.push(exercise);
        } else if (exercise.body_part_id === 5 || exercise.body_part_id === 6) {
          this.muscleGroup2.push(exercise);
        } else if (exercise.body_part_id === 4) {
          this.muscleGroup3.push(exercise);
        } else if (exercise.body_part_id === 7 || exercise.body_part_id === 8) {
          this.muscleGroup4.push(exercise);
        }
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

  getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  randomlyGenerateExercises = (formObject: any) => {
    console.log(formObject);
    let amountNeeded = 10 - this.cardExercises.length;
    for (let i = 0; i < amountNeeded; i++) {
      let added: boolean = false;
      while (!added) {
        if (formObject.bodyPart === '') {
          let index = this.getRandomIndex(this.exercises.length);
          added = this.addToGame(this.exercises[index]);
        } else {
          let choice = parseInt(formObject.bodyPart);
          if (choice === 1) {
            let index = this.getRandomIndex(this.muscleGroup1.length);
            added = this.addToGame(this.muscleGroup1[index]);
          }
          if (choice === 2) {
            let index = this.getRandomIndex(this.muscleGroup2.length);
            added = this.addToGame(this.muscleGroup2[index]);
          }
          if (choice === 3) {
            let index = this.getRandomIndex(this.muscleGroup3.length);
            added = this.addToGame(this.muscleGroup3[index]);
          }
          if (choice === 4) {
            let index = this.getRandomIndex(this.muscleGroup4.length);
            added = this.addToGame(this.muscleGroup4[index]);
          }
        }
      }
    }
    this.router.navigateByUrl('/card-game');
  };

  clearGameExercises = () => {
    this.exerciseService.clearGameExercises();
    this.getAndSetGameExercises();
  };

  toggleMode = () => {
    this.themeService.toggleMode();
    this.darkMode = this.themeService.getMode();
  };
  toggleDescription = () => {
    this.descriptionPage = !this.descriptionPage;
  };
}
