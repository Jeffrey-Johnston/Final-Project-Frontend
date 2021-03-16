import { ExternalExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-game-exercises',
  templateUrl: './game-exercises.component.html',
  styleUrls: ['./game-exercises.component.css'],
})
export class GameExercisesComponent implements OnInit {
  @Output() removeEvent = new EventEmitter<any>();
  @Output() startEvent = new EventEmitter<void>();
  @Input() cardExercisesRef!: Exercise[];
  url: string = '';
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

  emitStartEvent = () => {
    this.startEvent.emit();
  };
}
