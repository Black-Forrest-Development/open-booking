import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorGroupAdminRoutingModule } from './visitor-group-admin-routing.module';
import { VisitorGroupAdminEntryComponent } from './visitor-group-admin-entry/visitor-group-admin-entry.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import { VisitorGroupInfoDialogComponent } from './visitor-group-info-dialog/visitor-group-info-dialog.component';


@NgModule({
  declarations: [
    VisitorGroupAdminEntryComponent,
    VisitorGroupInfoDialogComponent
  ],
  exports: [
    VisitorGroupAdminEntryComponent
  ],
  imports: [
    CommonModule,
    VisitorGroupAdminRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
  ]
})
export class VisitorGroupAdminModule { }
