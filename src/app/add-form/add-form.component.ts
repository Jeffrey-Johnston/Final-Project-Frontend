import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  errorMessage: boolean = false;
  @Output() submitAddEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {}

  emitCloseForm = () => {
    this.closeEvent.emit();
  };

  onSubmit = (form: NgForm) => {
    if (
      form.form.value.name !== '' &&
      form.form.value.bodyPart !== '' &&
      form.form.value.difficulty !== '' &&
      form.form.value.description !== ''
    ) {
      this.submitAddEvent.emit(form.form.value);
    } else {
      this.errorMessage = true;
    }
  };
}
