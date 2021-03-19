import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../interfaces/exercise';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
})
export class CardGameComponent implements OnInit {
  darkMode!: boolean;
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
  timerRunning: boolean = false;
  gameStarted: boolean = false;
  exerciseStats: string = ``;
  timeStats: string = ``;

  constructor(
    private cardService: CardService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getAndSetDeck();
    this.getAndSetAllExercises();
    this.getAndSetGameExercises();
    this.darkMode = this.exerciseService.getMode();
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
    let exerciseIndex = this.getRandomIndex();
    this.currentExercise = this.gameExercises[exerciseIndex];
    if (this.remaining === 51 && this.seconds === 0) {
      this.startTimer();
    }
  };

  drawCards = () => {
    this.cardService.drawCards().subscribe((response: any) => {
      this.pileList = response.cards;
      console.log(this.pileList);
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
    });
  };

  getAndSetGameExercises = () => {
    this.gameExercises = this.exerciseService.getCardExercises();
    console.log(this.gameExercises);
  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * this.gameExercises.length);
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

  randomlyGenerateExercises = () => {
    let amountNeeded = 10 - this.gameExercises.length;
    for (let i = 0; i < amountNeeded; i++) {
      let added: boolean = false;
      while (!added) {
        let index = Math.floor(Math.random() * this.allExercises.length);
        added = this.addToGame(this.allExercises[index]);
      }
    }
    console.log(this.gameExercises);
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
    this.exerciseService.toggleMode();
    this.darkMode = this.exerciseService.getMode();
  };
}
