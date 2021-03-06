import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionFormComponent } from './option-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';



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
    MatDatepickerModule,
    MatDividerModule
  ],
  exports: [OptionFormComponent]
})
export class OptionFormModule { }
