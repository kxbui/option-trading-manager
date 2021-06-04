import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [
    OptionFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OptionFormModule { }
