import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {RequestAdminBoardComponent} from "./request-admin-board/request-admin-board.component";

const routes: Routes = [
  {path: '', component: RequestAdminBoardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestAdminRoutingModule {
}
