import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentTradeComponent } from './recent-trade.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { TradeListComponent } from './trade-list/trade-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RecentTradeResolver } from './recent-trade-resolver';
import { MatMenuModule } from '@angular/material/menu';
import { OptionValueFormatterModule } from '../core/option-value-formatter/option-value-formatter.module';
import { TotalBalanceModule } from '../core/total-balance/total-balance.module';

const routes: Routes = [
  {
    path: '',
    component: RecentTradeComponent,
    resolve: { metadata: RecentTradeResolver }
  }
];

@NgModule({
  declarations: [
    RecentTradeComponent,
    TradeListComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,

    OptionValueFormatterModule,
    TotalBalanceModule,

    RouterModule.forChild(routes)
  ]
})
export class RecentTradeModule { }
