import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl: string = `https://deckofcardsapi.com/api/deck`;
  deckID!: string;
  pileName: string = 'cardPile';

  constructor(private http: HttpClient) {}

  getNewDeck = () => {
    return this.http.get(`${this.baseUrl}/new/shuffle/`);
  };

  setDeckID = (deckID: string) => {
    this.deckID = deckID;
    console.log(this.deckID);
  };

  drawCards = () => {
    return this.http.get(`${this.baseUrl}/${this.deckID}/draw/?count=52`);
  };

  addToPile = (code: string) => {
    return this.http.get(
      `${this.baseUrl}/${this.deckID}/pile/${this.pileName}/add/?cards=${code}`
    );
  };

  getPileList = () => {
    return this.http.get(
      `${this.baseUrl}/${this.deckID}/pile/${this.pileName}/list/`
    );
  };
}
