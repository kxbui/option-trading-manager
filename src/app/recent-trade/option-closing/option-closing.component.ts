import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { tap } from 'rxjs/operators';
import { OptionTradingService } from 'src/app/core/services/option-trading.service';
import { OptionFormComponent } from '../option-form/option-form.component';

@Component({
  selector: 'app-option-closing',
  templateUrl: './option-closing.component.html',
  styleUrls: ['./option-closing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionClosingComponent implements OnInit {

  formGroup!: FormGroup;
  fields: {symbol: string; expirationDate: Date; optionType: string; strikePrice: number};
  constructor(private fb: FormBuilder, private optionService: OptionTradingService, public dialogRef: MatDialogRef<OptionFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { option: any }) { 
    this.fields = data.option.fields;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  submit() {
    this.optionService.editOption(this.data.option.name, {...this.formGroup.value, status: 'Closed'}).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      closedDate: [''],
      comment: ['']
    });
  }

}

@NgModule({
  declarations: [
    OptionClosingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDividerModule
  ]
})
export class OptionClosingModule { }