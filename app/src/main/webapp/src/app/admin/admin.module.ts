import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {TranslateModule} from "@ngx-translate/core";
import { AdminBoardOfferComponent } from './admin-board-offer/admin-board-offer.component';
import { AdminBoardBookingComponent } from './admin-board-booking/admin-board-booking.component';
import { AdminBoardBookingRequestComponent } from './admin-board-booking-request/admin-board-booking-request.component';
import { AdminBoardHomeComponent } from './admin-board-home/admin-board-home.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    AdminBoardComponent,
    AdminBoardOfferComponent,
    AdminBoardBookingComponent,
    AdminBoardBookingRequestComponent,
    AdminBoardHomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    TranslateModule
  ]
})
export class AdminModule { }
