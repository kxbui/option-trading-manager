import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { OptionTradingService } from 'src/app/core/services/option-trading.service';
import { tap } from 'rxjs/operators';
import { OptionFormModule } from 'src/app/core/option-form/option-form.module';

@Component({
  selector: 'app-option-form-container',
  templateUrl: './option-form-container.component.html',
  styleUrls: ['./option-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionFormContainerComponent implements OnInit {

  constructor(private fb: FormBuilder, private optionService: OptionTradingService, public dialogRef: MatDialogRef<OptionFormContainerComponent>, @Inject(MAT_DIALOG_DATA) public data: { option: any }) { }

  ngOnInit(): void { }

  onFormInit(formGroup: FormGroup) {
    this.setFormData(formGroup);
  }

  submit(formGroup: FormGroup) {
    this.data.option ? this.edit(formGroup) : this.add(formGroup);
  }

  edit(formGroup: FormGroup) {
    const dirtyValues = this.getDirtyValues(formGroup);
    this.optionService.editOption(this.data.option.name, dirtyValues).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  add(formGroup: FormGroup) {
    const form = formGroup.value;
    this.optionService.addOption({ ...form, status: 'Active' }).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  setFormData(formGroup: FormGroup) {
    this.data.option ? formGroup.patchValue(this.data.option.fields) : null;
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
    OptionFormContainerComponent
  ],
  imports: [
    CommonModule,
    OptionFormModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class OptionFormContainerModule { }