import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestAdminRoutingModule} from './request-admin-routing.module';
import {RequestAdminBoardComponent} from './request-admin-board/request-admin-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RequestAdminBoardEntryComponent} from './request-admin-board-entry/request-admin-board-entry.component';
import {VisitorGroupAdminModule} from "../visitor-group-admin/visitor-group-admin.module";
import {RequestAdminBoardVisitorGroupCellComponent} from './request-admin-board-visitor-group-cell/request-admin-board-visitor-group-cell.component';
import {RequestAdminBoardBookingsCellComponent} from './request-admin-board-bookings-cell/request-admin-board-bookings-cell.component';
import {RequestCommentDialogComponent} from './request-comment-dialog/request-comment-dialog.component';
import {RequestConfirmMessageDialogComponent} from './request-confirm-message-dialog/request-confirm-message-dialog.component';
import {NgxEditorModule} from "ngx-editor";


@NgModule({
  declarations: [
    RequestAdminBoardComponent,
    RequestAdminBoardEntryComponent,
    RequestAdminBoardVisitorGroupCellComponent,
    RequestAdminBoardBookingsCellComponent,
    RequestCommentDialogComponent,
    RequestConfirmMessageDialogComponent
  ],
  imports: [
    CommonModule,
    RequestAdminRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    VisitorGroupAdminModule,
    NgxEditorModule,
    FormsModule
  ]
})
export class RequestAdminModule {
}
