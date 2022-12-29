import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminBoardComponent} from "./admin-board/admin-board.component";

import {AdminBoardOfferComponent} from "./admin-board-offer/admin-board-offer.component";
import {AdminBoardBookingComponent} from "./admin-board-booking/admin-board-booking.component";
import {AdminBoardBookingRequestComponent} from "./admin-board-booking-request/admin-board-booking-request.component";
import {AdminBoardHomeComponent} from "./admin-board-home/admin-board-home.component";
import {AuthGuard} from "@auth0/auth0-angular";
import {AdminBoardOfferDetailsComponent} from "./admin-board-offer-details/admin-board-offer-details.component";
import {AdminBoardOfferChangeComponent} from "./admin-board-offer-change/admin-board-offer-change.component";
import {AdminBoardOfferDailyComponent} from "./admin-board-offer-daily/admin-board-offer-daily.component";

const routes: Routes = [
  {
    path: '',
    component: AdminBoardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: AdminBoardHomeComponent},
      {path: 'offer', component: AdminBoardOfferComponent},
      {path: 'offer/:id', component: AdminBoardOfferDailyComponent},
      {path: 'offer/details/:id', component: AdminBoardOfferDetailsComponent},
      {path: 'offer/edit/:id', component: AdminBoardOfferChangeComponent},
      {path: 'booking', component: AdminBoardBookingComponent},
      {path: 'request', component: AdminBoardBookingRequestComponent},
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
