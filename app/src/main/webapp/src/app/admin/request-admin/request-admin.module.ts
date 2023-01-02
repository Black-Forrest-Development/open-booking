import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestAdminRoutingModule } from './request-admin-routing.module';
import { RequestAdminBoardComponent } from './request-admin-board/request-admin-board.component';


@NgModule({
  declarations: [
    RequestAdminBoardComponent
  ],
  imports: [
    CommonModule,
    RequestAdminRoutingModule
  ]
})
export class RequestAdminModule { }
