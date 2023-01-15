import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfferBoardComponent} from "./offer-board/offer-board.component";

const routes: Routes = [
  {path: '', component: OfferBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule {
}
