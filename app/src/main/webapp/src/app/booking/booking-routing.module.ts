import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingBoardComponent} from "./booking-board/booking-board.component";
import {BookingDetailsComponent} from './booking-details/booking-details.component';

const routes: Routes = [
  {path: '', component: BookingBoardComponent},
  {path: 'details/:id', component: BookingDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
