import { ExternalExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-game-exercises',
  templateUrl: './game-exercises.component.html',
  styleUrls: ['./game-exercises.component.css'],
})
export class GameExercisesComponent implements OnInit {
  url: string = '';
  showCollapsible: boolean = false;
  @Input() cardExercisesRef!: Exercise[];
  @Input() currentExerciseRef!: Exercise;
  @Input() statsPageRef: boolean = false;
  @Input() darkModeRef!: boolean;
  @Output() removeEvent = new EventEmitter<any>();
  @Output() clearEvent = new EventEmitter<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((response) => {
      this.url = response[0].path;
      console.log(this.url);
    });
  }

  emitRemoveEvent = (exercise: any) => {
    this.removeEvent.emit(exercise);
  };

  toggleShowCollapsible = () => {
    this.showCollapsible = !this.showCollapsible;
  };

  emitClearEvent = () => {
    this.clearEvent.emit();
  };
}
