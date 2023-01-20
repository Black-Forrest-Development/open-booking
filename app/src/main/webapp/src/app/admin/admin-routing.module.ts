import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminBoardComponent} from "./admin-board/admin-board.component";
import {AuthGuard} from "@auth0/auth0-angular";

const routes: Routes = [
  {
    path: '',
    component: AdminBoardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'offer', loadChildren: () => import('./offer-admin/offer-admin.module').then(m => m.OfferAdminModule)},
      {path: 'booking', loadChildren: () => import('./booking-admin/booking-admin.module').then(m => m.BookingAdminModule)},
      {path: 'request', loadChildren: () => import('./request-admin/request-admin.module').then(m => m.RequestAdminModule)},
      {path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)}
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
