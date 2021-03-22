import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  darkMode!: boolean;
  currentTab: string = 'about-us';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.getMode();
  }

  toggleMode = () => {
    this.themeService.toggleMode();
    this.darkMode = this.themeService.getMode();
  };
}
