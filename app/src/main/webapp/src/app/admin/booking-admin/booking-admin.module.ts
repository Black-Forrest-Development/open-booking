import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingAdminRoutingModule} from './booking-admin-routing.module';
import {BookingAdminBoardComponent} from './booking-admin-board/booking-admin-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import {BookingAdminDayBoardComponent} from './booking-admin-day-board/booking-admin-day-board.component';
import {BookingAdminDayEntryComponent} from './booking-admin-day-entry/booking-admin-day-entry.component';
import {BookingDetailsInfoDialogComponent} from './booking-details-info-dialog/booking-details-info-dialog.component';
import {BookingDetailsInfoComponent} from './booking-details-info/booking-details-info.component';
import {OfferBookingDetailsComponent} from './offer-booking-details/offer-booking-details.component';
import {BookingDetailsComponent} from './booking-details/booking-details.component';
import {BookingChangeComponent} from './booking-change/booking-change.component';
import {VisitorGroupModule} from "../../backoffice/visitor-group/visitor-group.module";


@NgModule({
  declarations: [
    BookingAdminBoardComponent,
    BookingAdminDayBoardComponent,
    BookingAdminDayEntryComponent,
    BookingDetailsInfoDialogComponent,
    BookingDetailsInfoComponent,
    OfferBookingDetailsComponent,
    BookingDetailsComponent,
    BookingChangeComponent
  ],
  imports: [
    CommonModule,
    BookingAdminRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    VisitorGroupModule,
  ]
})
export class BookingAdminModule {
}
