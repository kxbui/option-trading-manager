import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MetadataService } from '../core/services/metadata.service';
import { OptionTradingService } from '../core/services/option-trading.service';

@Component({
  selector: 'app-recent-trade',
  templateUrl: './recent-trade.component.html',
  styleUrls: ['./recent-trade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTradeComponent implements OnInit {

  activeCols = [{ label: 'Symbol', value: 'symbol' }, { label: 'Action', value: 'action' }, { label: 'Option Type', value: 'optionType' }, { label: 'Quantity', value: 'quantity' }, { label: 'Cost Basic', value: 'costBasic' }, { label: 'Strike Price', value: 'strikePrice' }, { label: 'Acquired Date', value: 'acquiredDate' }, { label: 'Expiration Date', value: 'expirationDate' }, { label: 'Comment', value: 'comment' }]
  actions = [{ label: 'Edit', value: 'edit' }, { label: 'Delete', value: 'delete' }]
  activeOptions$ = new BehaviorSubject<any[] | null>(null);
  actionMap: any;

  constructor(public dialog: MatDialog, private optionService: OptionTradingService, private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.initMap();
    this.getRecentTrades();
  }

  getRecentTrades() {
    if (this.metadataService.metadata?.years) {
      const years = this.metadataService.metadata.years.filter(({ value }) => value >= new Date().getFullYear());
      this.optionService.getOptionsByYears(years).pipe(
        map((list: any[]) => list.filter((item: any) => item.status === 'Active')),
        tap((list: any[]) => this.activeOptions$.next(list))
      ).subscribe();
    }
  }

  async addOption(): Promise<void> {
    const { OptionFormComponent } = await import('./option-form/option-form.component');
    const dialogRef = this.dialog.open(OptionFormComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().pipe(
      filter(resp => !!resp),
      tap(_ => this.getRecentTrades())
    ).subscribe()
  }

  initMap() {
    this.actionMap = {
      delete: this.delete
    }
  }

  onActionClick(e: { value: string, option: any }) {
    if (this.actionMap[e.value]) {
      this.actionMap[e.value](e.option);
    }
  }

  delete = (option: any) => {
    this.optionService.deleteOption(option).pipe(
      tap(_ => this.getRecentTrades())
    ).subscribe();
  }
}
