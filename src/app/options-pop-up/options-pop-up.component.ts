import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-options-pop-up',
  templateUrl: './options-pop-up.component.html',
  styleUrls: ['./options-pop-up.component.css'],
})
export class OptionsPopUpComponent implements OnInit {
  url: string = '';
  @Input() darkModeRef!: boolean;
  @Input() cardExercisesRef!: any[];
  @Output() closeEvent = new EventEmitter<void>();
  @Output() generateEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((response) => {
      this.url = response[0].path;
    });
  }

  emitCloseEvent = () => {
    this.closeEvent.emit();
  };

  emitGenerateEvent = (formObject: any) => {
    this.generateEvent.emit(formObject);
  };
}
