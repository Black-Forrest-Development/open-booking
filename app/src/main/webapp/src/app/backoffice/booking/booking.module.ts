import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {BookingBoardComponent} from './booking-board/booking-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { BookingChangeComponent } from './booking-change/booking-change.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingDailyBoardComponent } from './booking-daily-board/booking-daily-board.component';
import { BookingDailyBoardOfferComponent } from './booking-daily-board-offer/booking-daily-board-offer.component';


@NgModule({
  declarations: [
    BookingBoardComponent,
    BookingChangeComponent,
    BookingDetailsComponent,
    BookingDailyBoardComponent,
    BookingDailyBoardOfferComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class BookingModule { }
