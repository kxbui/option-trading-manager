import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalBalance'
})
export class TotalBalancePipe implements PipeTransform {

  transform(options: any[] | null): number {
    return options?.reduce((total, item) => total += this.optionBalance(item.fields), 0);
  }

  optionBalance(option: any) {
    return (option.action === 'S' ? -1 : 1) * ((option.costBasic * option.quantity) - (option.fee ? +option.fee : 0));
  }

}
