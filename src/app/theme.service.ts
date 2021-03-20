import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode: boolean = false;

  constructor() {}

  toggleMode = () => {
    this.darkMode = !this.darkMode;
  };

  getMode = (): boolean => {
    return this.darkMode;
  };
}
