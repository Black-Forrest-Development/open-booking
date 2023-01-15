import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationBoardComponent} from "./notification-board/notification-board.component";

const routes: Routes = [
  {path: '', component: NotificationBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
