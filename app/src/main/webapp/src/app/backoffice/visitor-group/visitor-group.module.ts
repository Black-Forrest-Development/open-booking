import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorGroupRoutingModule } from './visitor-group-routing.module';
import { VisitorGroupInfoComponent } from './visitor-group-info/visitor-group-info.component';
import { VisitorGroupInfoDialogComponent } from './visitor-group-info-dialog/visitor-group-info-dialog.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    VisitorGroupInfoComponent,
    VisitorGroupInfoDialogComponent
  ],
  exports: [
    VisitorGroupInfoComponent
  ],
  imports: [
    CommonModule,
    VisitorGroupRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
  ]
})
export class VisitorGroupModule { }
