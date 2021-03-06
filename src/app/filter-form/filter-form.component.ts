import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit {
  addOpen: boolean = false;
  obj: any = { name: null, bodyPart: null, difficulty: null };
  @Input() darkModeRef!: boolean;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() vocabEvent = new EventEmitter<void>();
  @Output() clearFilterEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  emitSubmitEvent = (object: any) => {
    this.submitEvent.emit(object);
  };

  emitClearFilterEvent = (form: NgForm) => {
    form.reset();
    this.clearFilterEvent.emit();
  };

  toggleAddForm = () => {
    this.addOpen = !this.addOpen;
  };

  emitAddEvent = (formObject: any) => {
    this.addEvent.emit(formObject);
    this.toggleAddForm();
  };

  emitVocabEvent = () => {
    this.vocabEvent.emit();
  };
}
