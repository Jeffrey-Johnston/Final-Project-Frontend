import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  errorMessage: boolean = false;
  @Input() exerciseRef!: Exercise;
  @Input() cardExercisesRef!: any[];
  @Output() addToGameEvent = new EventEmitter<any>();
  @Output() removeFromGameEvent = new EventEmitter<any>();

  descriptionPopUp: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDescription = () => {
    this.descriptionPopUp = !this.descriptionPopUp;
  };

  emitAddToGameEvent = (exercise: any) => {
    if (this.cardExercisesRef.length < 13) {
      this.addToGameEvent.emit(exercise);
    } else {
      this.errorMessage = true;
    }
  };

  emitRemoveFromGameEvent = (exercise: any) => {
    this.removeFromGameEvent.emit(exercise);
  };

  checkIfAdded = (exercise: Exercise): boolean => {
    return this.cardExercisesRef.find(
      (item) => item.exercise_id === exercise.exercise_id
    );
  };

  toggleErrorMessage = () => {
    this.errorMessage = !this.errorMessage;
  };
}
