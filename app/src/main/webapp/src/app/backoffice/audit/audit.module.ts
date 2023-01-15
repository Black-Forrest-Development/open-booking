import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditRoutingModule} from './audit-routing.module';
import {AuditBoardComponent} from './audit-board/audit-board.component';
import {MaterialModule} from "../../material/material.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuditBoardComponent
  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class AuditModule { }
