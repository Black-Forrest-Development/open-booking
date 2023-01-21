import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestRoutingModule} from './request-routing.module';
import {RequestBoardComponent} from './request-board/request-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RequestBoardVisitorGroupCellComponent} from './request-board-visitor-group-cell/request-board-visitor-group-cell.component';
import {RequestBoardBookingCellComponent} from './request-board-booking-cell/request-board-booking-cell.component';
import {RequestConfirmationDialogComponent} from './request-confirmation-dialog/request-confirmation-dialog.component';
import {QuillModule} from "ngx-quill";


@NgModule({
  declarations: [
    RequestBoardComponent,
    RequestBoardVisitorGroupCellComponent,
    RequestBoardBookingCellComponent,
    RequestConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class RequestModule {
}
