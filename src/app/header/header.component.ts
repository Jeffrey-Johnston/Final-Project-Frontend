import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  darkMode!: boolean;
  @Output() toggleModeEvent = new EventEmitter<void>();

  constructor(
    private exerciseService: ExerciseService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.getMode();
  }

  emitToggleModeEvent = () => {
    this.toggleModeEvent.emit();
    this.darkMode = this.themeService.getMode();
  };
}
