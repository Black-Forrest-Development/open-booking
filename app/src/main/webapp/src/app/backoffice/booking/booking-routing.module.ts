import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingBoardComponent} from "./booking-board/booking-board.component";

const routes: Routes = [
  {path: '', component: BookingBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
