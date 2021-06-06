import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  constructor(private fb: FormBuilder, private optionService: OptionTradingService, public dialogRef: MatDialogRef<OptionFormComponent>) { }

  ngOnInit(): void {
    this.buildForm()
  }

  add() {
    const form = this.formGroup.value;
    this.optionService.addOption({ ...form, status: 'Active' }).pipe(
      tap(_ => this.dialogRef.close(true))
    ).subscribe();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      symbol: ['', [Validators.required]],
      action: ['', [Validators.required]],
      optionType: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      costBasic: ['', [Validators.required]],
      strikePrice: ['', [Validators.required]],
      acquiredDate: [''],
      expirationDate: ['', [Validators.required]],
      comment: ['']
    });
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