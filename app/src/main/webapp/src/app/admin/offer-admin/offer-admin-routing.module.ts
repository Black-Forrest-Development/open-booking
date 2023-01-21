import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {OfferAdminBoardComponent} from "./offer-admin-board/offer-admin-board.component";
import {OfferAdminDayBoardComponent} from "./offer-admin-day-board/offer-admin-day-board.component";
import {OfferAdminDetailsComponent} from './offer-admin-details/offer-admin-details.component';
import {OfferAdminPrintBoardComponent} from "./offer-admin-print-board/offer-admin-print-board.component";

const routes: Routes = [
  {path: '', component: OfferAdminBoardComponent, canActivate: [AuthGuard]},
  {path: 'day/:date', component: OfferAdminDayBoardComponent},
  {path: 'print/:date', component: OfferAdminPrintBoardComponent},
  {path: 'details/:id', component: OfferAdminDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferAdminRoutingModule {
}
