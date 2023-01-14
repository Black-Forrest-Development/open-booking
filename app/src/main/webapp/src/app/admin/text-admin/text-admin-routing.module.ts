import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {TextAdminBoardComponent} from "./text-admin-board/text-admin-board.component";
import {TextChangeComponent} from "./text-change/text-change.component";

const routes: Routes = [
  {path: '', component: TextAdminBoardComponent, canActivate: [AuthGuard]},
  {path: 'create', component: TextChangeComponent},
  {path: 'edit/:id', component: TextChangeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextAdminRoutingModule {
}
