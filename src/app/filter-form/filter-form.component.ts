import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();
  @Output() clearFilterEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  emitSubmitEvent = (form: NgForm) => {
    this.submitEvent.emit(form.form.value);
  };

  emitClearFilterEvent = () => {
    this.clearFilterEvent.emit();
  };
}
