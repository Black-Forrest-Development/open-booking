import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextAdminRoutingModule } from './text-admin-routing.module';
import { TextAdminBoardComponent } from './text-admin-board/text-admin-board.component';
import {LayoutModule} from "@angular/cdk/layout";
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";
import { TextChangeComponent } from './text-change/text-change.component';


@NgModule({
  declarations: [
    TextAdminBoardComponent,
    TextChangeComponent
  ],
  imports: [
    CommonModule,
    TextAdminRoutingModule,
    LayoutModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
  ]
})
export class TextAdminModule { }
