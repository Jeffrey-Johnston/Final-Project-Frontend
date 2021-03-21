import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit {
  @Input() darkModeRef!: boolean;
  @Output() submitEvent = new EventEmitter<any>();
  @Output() addEvent = new EventEmitter<any>();
  @Output() clearFilterEvent = new EventEmitter<any>();
  addOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  emitSubmitEvent = (form: NgForm) => {
    console.log(form.form.value);
    this.submitEvent.emit(form.form.value);
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
}
