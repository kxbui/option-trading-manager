import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionClosingComponent } from './option-closing.component';

describe('OptionClosingComponent', () => {
  let component: OptionClosingComponent;
  let fixture: ComponentFixture<OptionClosingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionClosingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionClosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
