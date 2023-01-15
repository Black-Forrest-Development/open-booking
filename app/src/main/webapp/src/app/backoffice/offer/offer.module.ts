import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OfferRoutingModule} from './offer-routing.module';
import {OfferBoardComponent} from './offer-board/offer-board.component';


@NgModule({
  declarations: [
    OfferBoardComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule
  ]
})
export class OfferModule { }
