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
  deck!: any;
  deckID!: string;
  remaining!: number;
  currentlyDrawn!: any;
  currentExercise!: Exercise;
  gameMode: boolean = true;
  gameExercises: Exercise[] = [];
  allExercises: Exercise[] = [];
  timer: any;
  hour: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timerRunning: boolean = false;

  constructor(
    private cardService: CardService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getAndSetDeck();
    this.getAndSetAllExercises();
    this.getAndSetGameExercises();
  }

  getAndSetDeck = () => {
    this.cardService.getNewDeck().subscribe((response: any) => {
      this.deck = response;
      this.deckID = this.deck.deck_id;
      this.remaining = this.deck.remaining;
      this.setDeckID();
      console.log(this.deck);
    });
  };

  setDeckID = () => {
    this.cardService.setDeckID(this.deckID);
  };

  drawCard = () => {
    this.cardService.drawCard().subscribe((response: any) => {
      let index = this.getRandomIndex();
      this.currentExercise = this.gameExercises[index];
      this.currentlyDrawn = response.cards[0];
      this.remaining = response.remaining;
      if (this.remaining === 51 && this.seconds === 0) {
        this.startTimer();
      }
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
      console.log(this.allExercises);
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
  };

  startTimer = () => {
    this.timerRunning = true;
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
}
