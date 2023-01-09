import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeBoardComponent} from "./home-board/home-board.component";

const routes: Routes = [
  {
    path: '',
    component: HomeBoardComponent,
    children: [
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', loadChildren: () => import('../day-info/day-info.module').then(m => m.DayInfoModule)},
      {path: 'booking', loadChildren: () => import('../booking/booking.module').then(m => m.BookingModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
