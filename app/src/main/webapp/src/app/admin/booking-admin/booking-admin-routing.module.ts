import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {BookingAdminBoardComponent} from './booking-admin-board/booking-admin-board.component';
import {BookingAdminDayBoardComponent} from "./booking-admin-day-board/booking-admin-day-board.component";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {BookingChangeComponent} from "./booking-change/booking-change.component";

const routes: Routes = [
  {path: '', component: BookingAdminBoardComponent, canActivate: [AuthGuard]},
  {path: 'day/:date', component: BookingAdminDayBoardComponent},
  {path: 'details/:id', component: BookingDetailsComponent},
  {path: 'create', component: BookingChangeComponent},
  {path: 'edit/:id', component: BookingChangeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingAdminRoutingModule {
}
