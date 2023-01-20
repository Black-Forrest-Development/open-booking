import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { DayInfoCardComponent } from './day-info-card/day-info-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DayInfoCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
