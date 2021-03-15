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
  exercises: Exercise[] = [];

  constructor(
    private cardService: CardService,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.getAndSetDeck();
    this.getAndSetExercises();
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
      this.currentExercise = this.exercises[index];
      this.currentlyDrawn = response.cards[0];
      this.remaining = response.remaining;
      console.log(this.currentlyDrawn);
      console.log(index);
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

  getAndSetExercises = () => {
    this.exercises = this.exerciseService.getCardExercises();
    console.log(this.exercises);
  };

  getRandomIndex = () => {
    return Math.floor(Math.random() * this.exercises.length);
  };

  resetGame = () => {
    this.getAndSetDeck();
  };
}
