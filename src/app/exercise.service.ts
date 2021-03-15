import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from './interfaces/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  baseURL: string = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  getExercises = (filterTerms: any) => {
    let params: any = {};
    if (filterTerms.name) {
      params.name = filterTerms.name;
    }
    if (filterTerms.bodyPart) {
      params.bodyPart = filterTerms.bodyPart;
    }
    if (filterTerms.difficulty) {
      params.difficulty = filterTerms.difficulty;
    }
    return this.http.get(`${this.baseURL}/exercises`, {
      params: params,
    });
  };

  addExercise = (formObject: any) => {
    return this.http.post(`${this.baseURL}/exercises`, formObject);
  };
}
