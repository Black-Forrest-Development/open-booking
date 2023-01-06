import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@auth0/auth0-angular";
import {SearchBoardComponent} from "./search-board/search-board.component";

const routes: Routes = [
  {path: '', component: SearchBoardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
