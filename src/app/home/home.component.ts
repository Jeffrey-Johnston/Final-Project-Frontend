import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  darkMode!: boolean;
  currentTab: string = 'home';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.darkMode = this.themeService.getMode();
  }

  toggleMode = () => {
    this.themeService.toggleMode();
    this.darkMode = this.themeService.getMode();
  };
}
