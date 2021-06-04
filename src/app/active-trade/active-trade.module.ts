import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTradeComponent } from './active-trade.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { TradeListComponent } from './trade-list/trade-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: ActiveTradeComponent
  }
];

@NgModule({
  declarations: [
    ActiveTradeComponent,
    TradeListComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

    RouterModule.forChild(routes)
  ]
})
export class ActiveTradeModule { }
