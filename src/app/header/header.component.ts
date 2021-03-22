import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  darkMode!: boolean;
  @Input() currentTabRef!: string;
  @Output() toggleModeEvent = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.getMode();
  }

  emitToggleModeEvent = () => {
    this.toggleModeEvent.emit();
    this.darkMode = this.themeService.getMode();
  };
}
