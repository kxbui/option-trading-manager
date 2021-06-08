import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionFormatter'
})
export class OptionValueFormatterPipe implements PipeTransform {

  constructor() { }

  transform(value: any, ...args: any[]): unknown {
    return args[0] === 'date' ? new DatePipe('en-US').transform(value, 'dd/MM/yyyy') : args[0] === 'currency' ? new CurrencyPipe('en-US').transform(value) : value;
  }

}
