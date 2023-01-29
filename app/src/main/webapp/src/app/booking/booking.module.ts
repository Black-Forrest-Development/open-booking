import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import {MaterialModule} from "../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import { BookingCreateVisitorGroupComponent } from './booking-create-visitor-group/booking-create-visitor-group.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BookingCreateOfferSelectComponent } from './booking-create-offer-select/booking-create-offer-select.component';


@NgModule({
  declarations: [
    BookingCreateComponent,
    BookingCreateVisitorGroupComponent,
    BookingCreateOfferSelectComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class BookingModule { }
