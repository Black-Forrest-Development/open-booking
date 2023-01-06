import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchBoardComponent } from './search-board/search-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgxEchartsModule} from "ngx-echarts";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SearchBoardComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    TranslateModule,
    NgxEchartsModule,
    ReactiveFormsModule,
  ]
})
export class SearchModule { }
