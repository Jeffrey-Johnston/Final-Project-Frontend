import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.css'],
})
export class GameDescriptionComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  @Input() darkModeRef!: boolean;
  constructor() {}

  ngOnInit(): void {}
  emitCloseEvent = () => {
    this.closeEvent.emit();
  };
}
