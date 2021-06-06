import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeListComponent implements OnInit {

  @Input()
  columnDefs!: { label: string; value: string}[];

  @Input()
  data!: any[] | null;

  @Input()
  actions!: any[] | null;

  @Output()
  actionClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onActionClick(value: string, option: any) {
    this.actionClick.emit({value, option})
  }

}
