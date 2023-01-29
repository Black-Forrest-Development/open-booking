import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingCreateComponent} from "./booking-create/booking-create.component";

const routes: Routes = [
  {path: 'create', component: BookingCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
