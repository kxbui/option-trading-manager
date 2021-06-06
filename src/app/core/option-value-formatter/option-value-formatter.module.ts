import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OptionValueFormatterPipe } from './option-value-formatter.pipe';



@NgModule({
  declarations: [
    OptionValueFormatterPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [DatePipe],
  exports: [
    OptionValueFormatterPipe
  ]
})
export class OptionValueFormatterModule { }
