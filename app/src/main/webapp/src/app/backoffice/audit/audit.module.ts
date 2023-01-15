import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditRoutingModule} from './audit-routing.module';
import {AuditBoardComponent} from './audit-board/audit-board.component';


@NgModule({
  declarations: [
    AuditBoardComponent
  ],
  imports: [
    CommonModule,
    AuditRoutingModule
  ]
})
export class AuditModule { }
