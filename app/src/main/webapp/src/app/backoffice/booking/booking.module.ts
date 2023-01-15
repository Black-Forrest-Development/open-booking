import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {BookingBoardComponent} from './booking-board/booking-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookingBoardComponent
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
