import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DayInfoDetailsComponent} from "./day-info-details/day-info-details.component";

const routes: Routes = [
  {path: 'details/:id', component: DayInfoDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayInfoRoutingModule {
}
