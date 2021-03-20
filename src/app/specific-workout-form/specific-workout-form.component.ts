import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-specific-workout-form',
  templateUrl: './specific-workout-form.component.html',
  styleUrls: ['./specific-workout-form.component.css'],
})
export class SpecificWorkoutFormComponent implements OnInit {
  @Input() darkModeRef!: boolean;
  @Output() startEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  emitStartEvent = (form: NgForm) => {
    this.startEvent.emit(form.form.value);
  };
}
