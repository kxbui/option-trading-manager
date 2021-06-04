import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-active-trade',
  templateUrl: './active-trade.component.html',
  styleUrls: ['./active-trade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveTradeComponent implements OnInit {

  activeCols = [{ label: 'ss', value: 'sss' }, { label: 'ss', value: 'sss' }, { label: 'ss', value: 'sss' }, { label: 'ss', value: 'sss' }]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async addOption(): Promise<void> {
    const { OptionFormComponent } = await import('./option-form/option-form.component');
    const dialogRef = this.dialog.open(OptionFormComponent, {
      width: '500px',
      data: {}
    });
  }
}
