import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeListComponent implements OnInit {

  @Input()
  columnDefs!: { label: string; value: string}[];

  constructor() { }

  ngOnInit(): void {
  }

}
