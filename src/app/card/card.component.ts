import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() cardRef!: any;
  @Input() indexRef!: number;
  @Input() currentIndexRef!: number;
  @Output() flipEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  emitFlipEvent = () => {
    this.flipEvent.emit();
  };
}
