import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestRoutingModule} from './request-routing.module';
import {RequestBoardComponent} from './request-board/request-board.component';


@NgModule({
  declarations: [
    RequestBoardComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
