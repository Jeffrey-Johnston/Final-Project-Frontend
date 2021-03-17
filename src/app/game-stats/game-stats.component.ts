import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent implements OnInit {
  statsPage: boolean = true;

  @Input() exerciseStatsRef!: string;
  @Input() timeStatsRef!: string;
  @Input() cardExercisesRef!: Exercise[];
  @Output() closeEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  emitCloseEvent = () => {
    this.closeEvent.emit();
  };
}
