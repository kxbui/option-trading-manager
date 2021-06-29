import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OptionValueFormatterPipe } from './option-value-formatter.pipe';



@NgModule({
  declarations: [
    OptionValueFormatterPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [DatePipe, CurrencyPipe],
  exports: [
    OptionValueFormatterPipe
  ]
})
export class OptionValueFormatterModule { }
