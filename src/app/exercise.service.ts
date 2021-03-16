import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from './interfaces/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  baseURL: string = `http://localhost:3000`;
  cardExercises: any[] = [];

  constructor(private http: HttpClient) {}

  getExercises = () => {
    return this.http.get(`${this.baseURL}/exercises`);
  };

  addExercise = (formObject: any) => {
    return this.http.post(`${this.baseURL}/exercises`, formObject);
  };

  addExerciseToGame = (exercise: any) => {
    this.cardExercises.push(exercise);
  };

  removeExerciseFromGame = (exercise: any) => {
    let index = this.cardExercises.findIndex(
      (item) => item.exercise_id === exercise.exercise_id
    );
    this.cardExercises.splice(index, 1);
  };

  getCardExercises = (): any[] => {
    return this.cardExercises;
  };
}
