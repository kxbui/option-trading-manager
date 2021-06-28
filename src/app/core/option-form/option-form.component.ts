import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionFormComponent implements OnInit {

  @Output()
  formInit = new EventEmitter();

  @Output()
  formSubmit = new EventEmitter();

  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.formInit.emit(this.formGroup);
  }

  submit() {
    this.formSubmit.emit(this.formGroup);
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      symbol: ['', [Validators.required]],
      action: ['', [Validators.required]],
      optionType: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      costBasic: ['', [Validators.required]],
      fee: [''],
      strikePrice: ['', [Validators.required]],
      acquiredDate: [''],
      expirationDate: ['', [Validators.required]],
      comment: ['']
    });
  }

}