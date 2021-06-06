import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTradeComponent } from './recent-trade.component';

describe('ActiveTradeComponent', () => {
  let component: RecentTradeComponent;
  let fixture: ComponentFixture<RecentTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
