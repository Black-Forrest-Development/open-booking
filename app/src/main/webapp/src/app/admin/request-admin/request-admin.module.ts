import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestAdminRoutingModule } from './request-admin-routing.module';
import { RequestAdminBoardComponent } from './request-admin-board/request-admin-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import { RequestAdminBoardEntryComponent } from './request-admin-board-entry/request-admin-board-entry.component';
import {VisitorGroupAdminModule} from "../visitor-group-admin/visitor-group-admin.module";


@NgModule({
  declarations: [
    RequestAdminBoardComponent,
    RequestAdminBoardEntryComponent
  ],
  imports: [
    CommonModule,
    RequestAdminRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
    VisitorGroupAdminModule,
  ]
})
export class RequestAdminModule { }
