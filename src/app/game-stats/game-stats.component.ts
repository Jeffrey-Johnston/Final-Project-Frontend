import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent implements OnInit {
  @Input() statsRef!: string;
  @Output() closeEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
  emitCloseEvent = () => {
    this.closeEvent.emit();
  };
}
