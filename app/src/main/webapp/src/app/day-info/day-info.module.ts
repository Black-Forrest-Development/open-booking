import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DayInfoBoardComponent} from './day-info-board/day-info-board.component';
import {DayInfoBoardActionsComponent} from './day-info-board-actions/day-info-board-actions.component';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import { DayInfoBoardContentComponent } from './day-info-board-content/day-info-board-content.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DayInfoBoardEntryComponent } from './day-info-board-entry/day-info-board-entry.component';
import { DayInfoBoardBookingComponent } from './day-info-board-booking/day-info-board-booking.component';


@NgModule({
  declarations: [
    DayInfoBoardComponent,
    DayInfoBoardActionsComponent,
    DayInfoBoardContentComponent,
    DayInfoBoardEntryComponent,
    DayInfoBoardBookingComponent
  ],
  exports: [
    DayInfoBoardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class DayInfoModule {
}
