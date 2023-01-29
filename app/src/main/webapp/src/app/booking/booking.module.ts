import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { BookingBoardComponent } from './booking-board/booking-board.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';


@NgModule({
  declarations: [
    BookingBoardComponent,
    BookingDetailsComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class BookingModule {
}
