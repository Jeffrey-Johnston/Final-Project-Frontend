import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../interfaces/exercise';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent implements OnInit {
  darkMode!: boolean;
  currentTab: string = 'card-game';
  currentIndex: number = -1;
  deck!: any;
  deckID!: string;
  remaining!: number;
  pileList!: any[];
  timer: any;
  hour: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  currentlyDrawn!: any;
  currentExercise!: Exercise;
  gameMode: boolean = true;
  gameOver: boolean = false;
  gameExercises: Exercise[] = [];
  allExercises: Exercise[] = [];
  muscleGroup1: Exercise[] = [];
  muscleGroup2: Exercise[] = [];
  muscleGroup3: Exercise[] = [];
  muscleGroup4: Exercise[] = [];
  timerRunning: boolean = false;
  gameStarted: boolean = false;
  exerciseStats: string = ``;
  timeStats: string = ``;
  descriptionPage: boolean = false;

  constructor(
    private cardService: CardService,
    private exerciseService: ExerciseService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAndSetDeck();
    this.getAndSetAllExercises();
    this.getAndSetGameExercises();
    this.darkMode = this.themeService.getMode();
  }

  getAndSetDeck = () => {
    this.cardService.getNewDeck().subscribe((response: any) => {
      this.deck = response;
      this.deckID = this.deck.deck_id;
      this.remaining = this.deck.remaining;
      this.setDeckID();
      this.drawCards();
    });
  };

  setDeckID = () => {
    this.cardService.setDeckID(this.deckID);
  };

  updateIndex = () => {
    this.currentIndex++;
    this.remaining--;
    let exerciseIndex = this.getRandomIndex(this.gameExercises.length);
    this.currentExercise = this.gameExercises[exerciseIndex];
    if (this.remaining === 51 && this.seconds === 0) {
      this.startTimer();
    }
  };

  drawCards = () => {
    this.cardService.drawCards().subscribe((response: any) => {
      this.pileList = response.cards;
      this.currentlyDrawn = this.pileList[0];
    });
  };

  checkGameStatus = (): number => {
    // if playing (cards < 52 or cards > 0), return 1 aka still playing
    if (this.remaining < 52 && this.remaining > 0) {
      return 1;
      // if game hasn't started, return 2 aka haven't started yet
    } else if (this.remaining >= 52) {
      return 2;
      // if game is over, return 0 aka done playing
    } else {
      return 0;
    }
  };

  getAndSetAllExercises = () => {
    this.exerciseService.getExercises().subscribe((response: any) => {
      this.allExercises = response;
      for (let exercise of this.allExercises) {
        if (
          exercise.body_part_id === 1 ||
          exercise.body_part_id === 2 ||
          exercise.body_part_id === 3
        ) {
          this.muscleGroup1.push(exercise);
        } else if (exercise.body_part_id === 5 || exercise.body_part_id === 6) {
          this.muscleGroup2.push(exercise);
        } else if (exercise.body_part_id === 4) {
          this.muscleGroup3.push(exercise);
        } else if (exercise.body_part_id === 7 || exercise.body_part_id === 8) {
          this.muscleGroup4.push(exercise);
        }
      }
    });
  };

  getAndSetGameExercises = () => {
    this.gameExercises = this.exerciseService.getCardExercises();
  };

  getRandomIndex = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  resetGame = () => {
    this.getAndSetDeck();
    this.resetTimer();
    this.stopTimer();
    this.currentIndex = -1;
  };

  startTimer = () => {
    this.timerRunning = true;
    this.gameStarted = true;
    this.exerciseStats = ``;
    this.timeStats = ``;
    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hour++;
      }
    }, 1000);
    this.updateIndex();
  };

  stopTimer = () => {
    this.timerRunning = false;
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.seconds = 0;
    this.minutes = 0;
    this.hour = 0;
    this.gameStarted = false;
  };

  addToGame = (exercise: any): boolean => {
    if (
      !this.gameExercises.find(
        (item) => item.exercise_id === exercise.exercise_id
      )
    ) {
      this.exerciseService.addExerciseToGame(exercise);
      this.gameExercises = this.exerciseService.getCardExercises();
      return true;
    } else {
      return false;
    }
  };

  randomlyGenerateExercises = (formObject: any) => {
    let amountNeeded = 10 - this.gameExercises.length;
    for (let i = 0; i < amountNeeded; i++) {
      let added: boolean = false;
      while (!added) {
        if (formObject.bodyPart === '') {
          let index = this.getRandomIndex(this.allExercises.length);
          added = this.addToGame(this.allExercises[index]);
        } else {
          let choice = parseInt(formObject.bodyPart);
          if (choice === 1) {
            let index = this.getRandomIndex(this.muscleGroup1.length);
            added = this.addToGame(this.muscleGroup1[index]);
          }
          if (choice === 2) {
            let index = this.getRandomIndex(this.muscleGroup2.length);
            added = this.addToGame(this.muscleGroup2[index]);
          }
          if (choice === 3) {
            let index = this.getRandomIndex(this.muscleGroup3.length);
            added = this.addToGame(this.muscleGroup3[index]);
          }
          if (choice === 4) {
            let index = this.getRandomIndex(this.muscleGroup4.length);
            added = this.addToGame(this.muscleGroup4[index]);
          }
        }
      }
    }
  };

  endGame = () => {
    this.stopTimer();
    this.gameStarted = false;
    this.toggleGameOver();
    this.exerciseStats += `You completed ${
      52 - this.remaining
    } out of 52 exercises!`;
    this.timeStats += ` It took you `;
    if (this.hour > 0) {
      this.timeStats += `${this.hour} hour`;
      if (this.hour > 1) {
        this.timeStats += `s`;
      }
      this.timeStats += `, `;
    }
    if (this.minutes > 0) {
      this.timeStats += `${this.minutes} minute`;
      if (this.minutes > 1) {
        this.timeStats += `s`;
      }
      this.timeStats += `, `;
    }

    this.timeStats += `${this.seconds} second`;
    if (this.seconds > 1 || this.seconds === 0) {
      this.timeStats += `s`;
    }
    this.timeStats += `.`;

    this.resetGame();
  };

  toggleGameOver = () => {
    this.gameOver = !this.gameOver;
  };

  toggleMode = () => {
    this.themeService.toggleMode();
    this.darkMode = this.themeService.getMode();
  };

  toggleDescription = () => {
    this.descriptionPage = !this.descriptionPage;
  };
}
