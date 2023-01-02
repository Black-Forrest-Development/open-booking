import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAdminRoutingModule } from './booking-admin-routing.module';
import { BookingAdminBoardComponent } from './booking-admin-board/booking-admin-board.component';


@NgModule({
  declarations: [
    BookingAdminBoardComponent
  ],
  imports: [
    CommonModule,
    BookingAdminRoutingModule
  ]
})
export class BookingAdminModule { }
