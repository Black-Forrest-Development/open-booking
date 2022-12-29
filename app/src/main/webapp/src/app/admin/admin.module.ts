import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminBoardComponent} from './admin-board/admin-board.component';
import {LayoutModule} from '@angular/cdk/layout';
import {TranslateModule} from "@ngx-translate/core";
import {AdminBoardOfferComponent} from './admin-board-offer/admin-board-offer.component';
import {AdminBoardBookingComponent} from './admin-board-booking/admin-board-booking.component';
import {AdminBoardBookingRequestComponent} from './admin-board-booking-request/admin-board-booking-request.component';
import {AdminBoardHomeComponent} from './admin-board-home/admin-board-home.component';
import {MaterialModule} from "../material/material.module";
import {NgxEchartsModule} from "ngx-echarts";
import { AdminBoardOfferDetailsComponent } from './admin-board-offer-details/admin-board-offer-details.component';
import { AdminBoardOfferChangeComponent } from './admin-board-offer-change/admin-board-offer-change.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AdminBoardOfferDailyComponent } from './admin-board-offer-daily/admin-board-offer-daily.component';


@NgModule({
  declarations: [
    AdminBoardComponent,
    AdminBoardOfferComponent,
    AdminBoardBookingComponent,
    AdminBoardBookingRequestComponent,
    AdminBoardHomeComponent,
    AdminBoardOfferDetailsComponent,
    AdminBoardOfferChangeComponent,
    AdminBoardOfferDailyComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class AdminModule {
}
