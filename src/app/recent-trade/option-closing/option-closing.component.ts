import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { switchMap, tap } from 'rxjs/operators';
import { OptionFormModule } from 'src/app/core/option-form/option-form.module';
import { OptionTradingService } from 'src/app/core/services/option-trading.service';

@Component({
  selector: 'app-option-closing',
  templateUrl: './option-closing.component.html',
  styleUrls: ['./option-closing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionClosingComponent implements OnInit {

  fields: { symbol: string; expirationDate: Date; optionType: string; strikePrice: number };
  constructor(private fb: FormBuilder, private optionService: OptionTradingService, public dialogRef: MatDialogRef<OptionClosingComponent>, @Inject(MAT_DIALOG_DATA) public data: { option: any }) {
    this.fields = data.option.fields;
  }

  ngOnInit(): void { }

  onFormInit(formGroup: FormGroup) {
    this.setFormData(formGroup);
  }

  setFormData(formGroup: FormGroup) {
    formGroup.patchValue(this.data.option.fields);
  }

  submit(formGroup: FormGroup) {
    this.optionService.editOption(this.data.option.name, { ...formGroup.value, status: 'Closed' }).pipe(
      switchMap(_ => this.optionService.addOption(this.buildCloseOption(formGroup)).pipe(
        tap(_ => this.dialogRef.close(true))
      ))
    ).subscribe();
  }

  buildCloseOption(formGroup: FormGroup) {
    const form = formGroup.getRawValue();
    return {
      ...form, action: form.action === 'B' ? 'S' : 'B', acquiredDate: new Date(),
      expirationDate: new Date()
    }
  }
}

@NgModule({
  declarations: [
    OptionClosingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    OptionFormModule
  ]
})
export class OptionClosingModule { }