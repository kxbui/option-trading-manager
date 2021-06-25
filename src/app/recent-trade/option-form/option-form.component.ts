import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { OptionTradingService } from 'src/app/core/services/option-trading.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionFormComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private optionService: OptionTradingService, public dialogRef: MatDialogRef<OptionFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { option: any }) { }

  ngOnInit(): void {
    this.buildForm();
    this.setFormData();
  }

  submit() {
    this.data.option ? this.edit() : this.add();
  }

  edit() {
    const dirtyValues = this.getDirtyValues(this.formGroup);
    this.optionService.editOption(this.data.option.name, dirtyValues).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  add() {
    const form = this.formGroup.value;
    this.optionService.addOption({ ...form, status: 'Active' }).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  setFormData() {
    this.data.option ? this.formGroup.patchValue(this.data.option.fields) : null;
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

  getDirtyValues(form: FormGroup) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach(key => {
        let currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl instanceof FormGroup)
            dirtyValues[key] = this.getDirtyValues(currentControl);
          else
            dirtyValues[key] = currentControl.value;
        }
      });
    return dirtyValues;
  }

}

@NgModule({
  declarations: [
    OptionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDividerModule
  ]
})
export class OptionFormModule { }