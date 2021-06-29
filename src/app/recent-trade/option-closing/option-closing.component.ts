import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
  Inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { switchMap, tap } from 'rxjs/operators';
import { OptionFormModule } from 'src/app/shared/option-form/option-form.module';
import { OptionTradingService } from 'src/app/core/services/option-trading.service';

@Component({
  selector: 'app-option-closing',
  templateUrl: './option-closing.component.html',
  styleUrls: ['./option-closing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionClosingComponent implements OnInit {
  fields: {
    symbol: string;
    expirationDate: Date;
    optionType: string;
    strikePrice: number;
  };
  constructor(
    private optionService: OptionTradingService,
    public dialogRef: MatDialogRef<OptionClosingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { option: any }
  ) {
    this.fields = data.option.fields;
  }

  ngOnInit(): void {}

  onFormInit(formGroup: FormGroup) {
    this.setFormData(formGroup);
  }

  setFormData(formGroup: FormGroup) {
    const fields = this.data.option.fields;
    formGroup.patchValue({
      ...fields,
      action: fields.action === 'B' ? 'S' : 'B',
      costBasic: '',
      fee: ''
    });
    formGroup.get('symbol')?.disable();
    formGroup.get('action')?.disable();
    formGroup.get('optionType')?.disable();
    formGroup.get('quantity')?.disable();
    formGroup.get('strikePrice')?.disable();
    formGroup.get('acquiredDate')?.disable();
    formGroup.get('expirationDate')?.disable();
  }

  submit(formGroup: FormGroup) {
    this.optionService
      .editOption(this.data.option.name, {
        ...this.data.option.fields,
        status: 'Closed',
        closingDate: formGroup.value.closingDate,
        comment: formGroup.value.comment
      })
      .pipe(
        switchMap((_) =>
          this.optionService
            .addOption(this.buildCloseOption(formGroup))
            .pipe(tap((_) => this.dialogRef.close(true)))
        )
      )
      .subscribe();
  }

  buildCloseOption(formGroup: FormGroup) {
    const form = formGroup.getRawValue();
    return {
      ...form,
      acquiredDate: new Date(),
      expirationDate: new Date(),
      status: 'Closed',
      comment: 'Auto-generated'
    };
  }
}

@NgModule({
  declarations: [OptionClosingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
    OptionFormModule,
  ],
})
export class OptionClosingModule {}
