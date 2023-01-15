import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResponseRoutingModule} from './response-routing.module';
import {ResponseBoardComponent} from './response-board/response-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { ResponseChangeComponent } from './response-change/response-change.component';
import { ResponseDetailsComponent } from './response-details/response-details.component';
import { ResponseDeleteDialogComponent } from './response-delete-dialog/response-delete-dialog.component';


@NgModule({
  declarations: [
    ResponseBoardComponent,
    ResponseChangeComponent,
    ResponseDetailsComponent,
    ResponseDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ResponseRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class ResponseModule {
}
