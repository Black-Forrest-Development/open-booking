import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferAdminBoardComponent} from './offer-admin-board/offer-admin-board.component';
import {OfferAdminRoutingModule} from "./offer-admin-routing.module";
import {LayoutModule} from "@angular/cdk/layout";
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeModule} from "../../home/home.module";
import { OfferAdminDayBoardComponent } from './offer-admin-day-board/offer-admin-day-board.component';
import { OfferAdminPrintBoardComponent } from './offer-admin-print-board/offer-admin-print-board.component';
import { OfferAdminChangeComponent } from './offer-admin-change/offer-admin-change.component';
import { OfferAdminDetailsComponent } from './offer-admin-details/offer-admin-details.component';
import { OfferAdminChangeDialogComponent } from './offer-admin-change-dialog/offer-admin-change-dialog.component';
import { OfferAdminCreateSeriesDialogComponent } from './offer-admin-create-series-dialog/offer-admin-create-series-dialog.component';


@NgModule({
  declarations: [
    OfferAdminBoardComponent,
    OfferAdminDayBoardComponent,
    OfferAdminPrintBoardComponent,
    OfferAdminChangeComponent,
    OfferAdminDetailsComponent,
    OfferAdminChangeDialogComponent,
    OfferAdminCreateSeriesDialogComponent
  ],
  imports: [
    CommonModule,
    OfferAdminRoutingModule,
    LayoutModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class OfferAdminModule {
}
