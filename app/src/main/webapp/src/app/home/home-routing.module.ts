import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeBoardComponent} from "./home-board/home-board.component";

const routes: Routes = [
  {path: '', component: HomeBoardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
