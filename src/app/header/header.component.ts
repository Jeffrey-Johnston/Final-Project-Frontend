import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  darkMode!: boolean;
  @Output() toggleModeEvent = new EventEmitter<void>();

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.darkMode = this.exerciseService.getMode();
  }

  emitToggleModeEvent = () => {
    this.toggleModeEvent.emit();
    this.darkMode = this.exerciseService.getMode();
  };
}
