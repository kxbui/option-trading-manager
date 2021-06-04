import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  add() {

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