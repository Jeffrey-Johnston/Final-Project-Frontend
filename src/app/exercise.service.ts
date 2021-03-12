import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from './interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  baseURL: string = `http://localhost:3000`


  constructor(private http: HttpClient) { }

getExercises = ()=>{
  return this.http.get(`${this.baseURL}/exercises`)
}

}
