import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAdminRoutingModule } from './booking-admin-routing.module';
import { BookingAdminBoardComponent } from './booking-admin-board/booking-admin-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookingAdminBoardComponent
  ],
  imports: [
    CommonModule,
    BookingAdminRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
  ]
})
export class BookingAdminModule { }
