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
import { BookingBoardEntryComponent } from './booking-board-entry/booking-board-entry.component';
import {VisitorGroupModule} from "../visitor-group/visitor-group.module";
import { BookingDetailsHeaderComponent } from './booking-details-header/booking-details-header.component';
import { BookingDetailsVisitorGroupComponent } from './booking-details-visitor-group/booking-details-visitor-group.component';
import { BookingDetailsBookingsComponent } from './booking-details-bookings/booking-details-bookings.component';


@NgModule({
  declarations: [
    BookingBoardComponent,
    BookingChangeComponent,
    BookingDetailsComponent,
    BookingDailyBoardComponent,
    BookingDailyBoardOfferComponent,
    BookingBoardEntryComponent,
    BookingDetailsHeaderComponent,
    BookingDetailsVisitorGroupComponent,
    BookingDetailsBookingsComponent
  ],
    imports: [
        CommonModule,
        BookingRoutingModule,
        MaterialModule,
        TranslateModule,
        ReactiveFormsModule,
        VisitorGroupModule,
    ]
})
export class BookingModule { }
