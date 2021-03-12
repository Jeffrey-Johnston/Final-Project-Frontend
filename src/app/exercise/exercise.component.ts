import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit {
  @Input() exerciseRef!: Exercise;

  descriptionPopUp: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDescription = () => {
    this.descriptionPopUp = !this.descriptionPopUp;
  };
}
