import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalBalancePipe } from './total-balance.pipe';



@NgModule({
  declarations: [
    TotalBalancePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TotalBalancePipe]
})
export class TotalBalanceModule { }
