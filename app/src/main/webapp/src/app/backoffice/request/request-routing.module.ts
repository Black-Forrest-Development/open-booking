import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequestBoardComponent} from "./request-board/request-board.component";

const routes: Routes = [
  {path: '', component: RequestBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule {
}
