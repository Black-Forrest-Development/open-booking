import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminBoardComponent} from "./admin-board/admin-board.component";
import {AuthGuard} from "../auth/auth.guard";
import {AdminBoardOfferComponent} from "./admin-board-offer/admin-board-offer.component";
import {AdminBoardBookingComponent} from "./admin-board-booking/admin-board-booking.component";
import {AdminBoardBookingRequestComponent} from "./admin-board-booking-request/admin-board-booking-request.component";
import {AdminBoardHomeComponent} from "./admin-board-home/admin-board-home.component";

const routes: Routes = [
  {
    path: '',
    component: AdminBoardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: AdminBoardHomeComponent},
      {path: 'offer', component: AdminBoardOfferComponent},
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
