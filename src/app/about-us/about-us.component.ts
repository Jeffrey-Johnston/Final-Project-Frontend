import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  darkMode!: boolean;

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.darkMode = this.exerciseService.getMode();
  }

  toggleMode = () => {
    this.exerciseService.toggleMode();
    this.darkMode = this.exerciseService.getMode();
  };
}
