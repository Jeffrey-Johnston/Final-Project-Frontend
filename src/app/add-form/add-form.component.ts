import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  emitCloseForm = () => {
    this.closeEvent.emit();
  };
}
