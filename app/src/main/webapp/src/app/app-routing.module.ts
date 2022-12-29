import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'booking', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)},
  {path: 'day-info', loadChildren: () => import('./day-info/day-info.module').then(m => m.DayInfoModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
  {path: 'help', loadChildren: () => import('./help/help.module').then(m => m.HelpModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
