import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl: string = `https://deckofcardsapi.com/api/deck`;
  deckID!: string;

  constructor(private http: HttpClient) {}

  getNewDeck = () => {
    return this.http.get(`${this.baseUrl}/new/shuffle/`);
  };

  setDeckID = (deckID: string) => {
    this.deckID = deckID;
    console.log(this.deckID);
  };

  // getDeckID = () => {
  //   return this.deckID;
  // }

  drawCard = () => {
    return this.http.get(`${this.baseUrl}/${this.deckID}/draw/?count=1`);
  };
}
