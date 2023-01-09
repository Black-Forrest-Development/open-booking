import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DayInfoBoardContentComponent} from "./day-info-board-content/day-info-board-content.component";
import {DayInfoBoardComponent} from "./day-info-board/day-info-board.component";
import {DayInfoDetailsComponent} from "./day-info-details/day-info-details.component";

const routes: Routes = [
  {
    path: '',
    component: DayInfoBoardComponent,
    children: [
      {path: '', component: DayInfoBoardContentComponent},
      {path: 'details/:date', component: DayInfoDetailsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayInfoRoutingModule {
}
